import { NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { createAccessToken } from "@/lib/jwt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const loginSchema = z.object({
    email: z.string().email({ message: "Email tidak valid" }),
    password: z.string().min(8, { message: "Password minimal 8 karakter" }),
  });

  try {
    const body = await req.json();
    const { email, password } = body;

    const parsedData = loginSchema.safeParse({
      email,
      password,
    });

    if (!parsedData.success) {
      return NextResponse.json(
        { message: parsedData.error.errors },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email tidak terdaftar" },
        { status: 400 }
      );
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Email atau Password tidak valid" },
        { status: 401 }
      );
    }
    const token = createAccessToken(user);

    return NextResponse.json(
      { message: "Login Berhasil", token },
      { status: 200 }
    );
  } catch (error) {
    console.log("[POST LOGIN: ]", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
