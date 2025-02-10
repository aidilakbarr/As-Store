import { verifyAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { idUser: string; idReview: string } }
) {
  try {
    const { idUser, idReview } = await params;

    if (!idUser || !idReview) {
      return NextResponse.json(
        { error: "Missing idUser parameter" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "";
    const decoded = await verifyAccessToken(accessToken);
    if (!decoded || decoded.id !== idUser || decoded.role !== "SELLER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.review.delete({
      where: {
        id: idReview,
      },
    });

    return NextResponse.json(
      { message: "Review berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[POST_REVIEW]: ", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
