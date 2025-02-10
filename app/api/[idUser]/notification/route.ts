import { verifyAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { idUser: string } }
) {
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

  try {
    const orders = await prisma.notification.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.log("[GET_ORDER]: ", error);
    return NextResponse.json(error, { status: 500 });
  }
}
