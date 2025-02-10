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
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.log("[GET_ORDER]: ", error);
    NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(
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
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { idNotification } = body;
    const orders = await prisma.order.update({
      data: {
        isRead: true,
      },
      where: {
        id: idNotification,
      },
    });

    NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.log("[GET_ORDER]: ", error);
    NextResponse.json(error, { status: 500 });
  }
}
