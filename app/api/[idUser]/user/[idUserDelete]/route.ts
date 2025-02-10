import { verifyAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
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

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "";
    const decoded = await verifyAccessToken(accessToken);
    if (!decoded || decoded.id !== idUser || decoded.role !== "SELLER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
