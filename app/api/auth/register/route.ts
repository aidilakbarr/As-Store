import { NextResponse } from "next/server";
import * as z from "zod";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { createAccessToken, createRefreshToken } from "@/lib/jwt";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const registerSchema = z.object({
    username: z.string().min(3, { message: "Nama minimal 3 karakter" }),
    email: z.string().email({ message: "Email tidak valid" }),
    password: z.string().min(8, {
      message: "Password harus lebih dari 8 karakter",
    }),
  });

  try {
    const body = await req.json();
    const { username, email, password } = body;

    const parsedData = registerSchema.safeParse({
      username,
      email,
      password,
    });

    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.errors },
        {
          status: 400,
        }
      );
    }

    const userIsExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    console.log(userIsExist);

    if (userIsExist) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    const hashedPassword = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword,
        role: "CUSTOMER",
      },
    });

    const accessToken = await createAccessToken(user);
    const refreshToken = await createRefreshToken(user);

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 30,
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      { message: "Akun sukses dibuat" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[REGISTER POST]: ", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
