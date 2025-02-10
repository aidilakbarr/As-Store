import { verifyAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import * as z from "zod";

export const formSchema = z.object({
  fullName: z.string().min(3, "Full Name harus memiliki minimal 3 karakter"),
  phoneAddress: z
    .string()
    .regex(
      /^(?:\+62|62|0)8[1-9][0-9]{7,10}$/,
      "Format nomor telepon tidak valid (contoh: +62 81234567890 atau 081234567890)"
    ),
  address: z.string().min(5, "Alamat harus memiliki minimal 5 karakter"),
  bio: z
    .string()
    .max(300, "Bio tidak boleh lebih dari 300 karakter")
    .optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { idUser: string } }
) {
  try {
    const { idUser } = await params;

    if (!idUser) {
      return NextResponse.json(
        { error: "Missing idUser parameter" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "";
    const decoded = await verifyAccessToken(accessToken);
    if (!decoded || decoded.id !== idUser || decoded.role !== "SELLER") {
      return NextResponse.json(
        { error: "Unauthorized", decoded, idUser },
        { status: 401 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        id: idUser,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("[GET_ME]: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { idUser: string } }
) {
  try {
    const { idUser } = await params;

    if (!idUser) {
      return NextResponse.json(
        { error: "Missing idUser parameter" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "";
    const decoded = await verifyAccessToken(accessToken);
    if (!decoded || decoded.id !== idUser || decoded.role !== "SELLER") {
      return NextResponse.json(
        { error: "Unauthorized", decoded, idUser },
        { status: 401 }
      );
    }

    const body = await req.json();

    const parsedData = formSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { message: parsedData.error.errors, body },
        { status: 400 }
      );
    }

    const { fullName, phoneAddress, address, bio } = body;

    await prisma.user.update({
      data: {
        name: fullName,
        phone: phoneAddress,
        address: address,
        bio: bio,
      },
      where: {
        id: idUser,
      },
    });

    return NextResponse.json(
      { message: "User berhasil diupdate" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PUT_USER]: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
