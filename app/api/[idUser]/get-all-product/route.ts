import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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

    const response = await prisma.product.findMany({
      where: {
        sellerId: idUser,
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log("[GET_PRODUCT]: ", error);
    return NextResponse.json(error, { status: 500 });
  }
}
