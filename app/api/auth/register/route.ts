import { NextResponse } from "next/server";
import * as z from "zod";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export async function POST(req: Request) {
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

    await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword,
        role: "CUSTOMER",
      },
    });

    return NextResponse.json(
      { message: "Akun sukses dibuat" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[Register post]: ", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
