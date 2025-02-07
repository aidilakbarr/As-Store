import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { idUser: string; idUserDelete: string } }
) {
  try {
    const { idUser, idUserDelete } = await params;

    if (!idUser || !idUserDelete) {
      return NextResponse.json(
        { error: "Missing idUser parameter", idUser, idUserDelete },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: {
        id: idUserDelete,
      },
    });

    return NextResponse.json({ message: "Berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.log("[DELETE_PRODUCT: ]", error.message);
    return NextResponse.json(error);
  }
}
