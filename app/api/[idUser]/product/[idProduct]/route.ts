import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { idUser: string; idProduct: string } }
) {
  try {
    const { idUser, idProduct } = await params;

    if (!idUser) {
      return NextResponse.json(
        { error: "Missing idUser parameter" },
        { status: 400 }
      );
    }

    const response = await prisma.product.findFirst({
      where: {
        sellerId: idUser,
        id: idProduct,
      },
    });

    console.log("1", response);
    console.log("2", idUser);
    console.log("3", idProduct);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log("[GET_PRODUCT]: ", error);
    return NextResponse.json(error, { status: 500 });
  }
}
