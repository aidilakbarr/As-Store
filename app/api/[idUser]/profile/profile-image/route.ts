import { verifyAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { profile } from "console";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

    const { url } = body;

    await prisma.user.update({
      data: {
        profile: url,
      },
      where: {
        id: idUser,
      },
    });

    return NextResponse.json(
      { message: "Profile berhasil di update" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PROFILE_UPDATE_USER]: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
