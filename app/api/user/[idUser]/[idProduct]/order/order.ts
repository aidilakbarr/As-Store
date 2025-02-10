import { verifyAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { pusherServer } from "@/utils/pusher";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { idUser: string; idProduct: string } }
) {
  const { idUser, idProduct } = await params;

  if (!idUser || !idProduct) {
    return NextResponse.json(
      { error: "Missing idUser or idProduct parameter" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const decoded = await verifyAccessToken(accessToken);
  if (!decoded || decoded.id !== idUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { total } = body;
    const order = await prisma.order.create({
      data: {
        total,
        productId: idProduct,
        userId: idUser,
        status: "PENDING",
      },
    });

    const notification = await prisma.notification.create({
      data: {
        message: `User telah membeli product ${order.id}`,
        orderId: order.id,
      },
    });

    await pusherServer.trigger("admin-notification", "new-notification", {
      notification,
    });

    NextResponse.json({ message: "Berhasil dipesan" }, { status: 200 });
  } catch (error) {
    console.log("[POST_ORDER]: ", error);
    NextResponse.json(error, { status: 500 });
  }
}
