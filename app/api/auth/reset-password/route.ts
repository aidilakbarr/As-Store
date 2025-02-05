import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { cookies } from "next/headers";
import * as z from "zod";

const prisma = new PrismaClient();

const formSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP harus berisi 6 angka")
    .max(6, "OTP harus berisi 6 angka"),
  newPassword: z.string().min(8, "Password minimal 8 karakter"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cookiesList = await cookies();
    const email = cookiesList.get("email")?.value;
    const { otp, newPassword } = body;

    const parsedData = formSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        {
          error: parsedData.error.errors,
        },
        {
          status: 400,
        }
      );
    }

    if (!email) {
      return NextResponse.json({ message: "Email empty" }, { status: 400 });
    }

    const userOtp = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userOtp) {
      return NextResponse.json(
        {
          message: "User tidak ditemukan",
        },
        {
          status: 401,
        }
      );
    }

    if (otp !== userOtp.resetPasswordToken) {
      return NextResponse.json({ message: "OTP Invalid" }, { status: 400 });
    }

    if (
      userOtp.resetPasswordExpires === null ||
      userOtp.resetPasswordExpires < new Date()
    ) {
      return NextResponse.json({ message: "OTP Expired" }, { status: 400 });
    }

    const newHashPassword = await argon2.hash(newPassword);

    await prisma.user.update({
      where: { id: userOtp.id },
      data: {
        password: newHashPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return NextResponse.json(
      { message: "Success" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
