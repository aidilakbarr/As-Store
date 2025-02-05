import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import * as z from "zod";
import { generateOTP, generateOTPExpired } from "@/utils/generateOTP";
import sendEmail from "@/utils/sendEmailForgotPassword";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const emailSchema = z.object({
    email: z.string().email("Invalid email format"),
  });

  try {
    const body = await req.json();

    const parsedData = emailSchema.safeParse(body);

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

    const { email } = body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Email tidak ditemukan",
        },
        {
          status: 400,
        }
      );
    }

    const OTP: string = generateOTP();
    const OTPExpired: Date = generateOTPExpired();
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        resetPasswordToken: OTP,
        resetPasswordExpires: OTPExpired,
      },
    });

    await sendEmail(user.name, OTP, email);

    cookieStore.set("email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 30,
    });

    return NextResponse.json({ message: "OTP Sending..." }, { status: 200 });
  } catch (error) {
    console.log("[RESET_PASSWORD]: ", error);
  }
}
