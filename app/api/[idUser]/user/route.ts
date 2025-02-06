import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
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
    console.error("[POST_ME]: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
