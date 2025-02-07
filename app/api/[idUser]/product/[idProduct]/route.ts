import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as z from "zod";

export async function GET(
  req: Request,
  { params }: { params: { idUser: string; idProduct: string } }
) {
  try {
    const { idUser, idProduct } = await params;

    if (!idUser || !idProduct) {
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

const productSchema = z.object({
  nama: z
    .string()
    .min(3, "Nama produk minimal 3 karakter")
    .max(100, "Nama terlalu panjang"),
  harga: z.number().min(1, "Harga wajib diisi"),
  stok: z.number().min(1, "Stok wajib diisi"),
  warna: z
    .string()
    .min(3, "Warna minimal 3 karakter")
    .max(50, "Nama warna terlalu panjang"),
  kategori: z
    .array(z.enum(["ELEKTRONIK", "MAINAN", "ALAT_SEKOLAH", "AKSESORIS"]))
    .nonempty("Pilih minimal 1 kategori"),
  deskripsi: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter")
    .max(1000, "Deskripsi terlalu panjang"),
  imageUrl: z.array(z.string().url()).nonempty("Pilih minimal 1 kategori"),
});

export async function PUT(
  req: Request,
  { params }: { params: { idUser: string; idProduct: string } }
) {
  try {
    const body = await req.json();
    const { idUser, idProduct } = await params;

    if (!idUser || !idProduct) {
      return NextResponse.json(
        { error: "Missing idUser parameter" },
        { status: 400 }
      );
    }

    const parsedData = productSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { message: parsedData.error.errors },
        { status: 400 }
      );
    }

    const kategori = parsedData.data.kategori.map(
      (k: string) =>
        k.toUpperCase() as
          | "ELEKTRONIK"
          | "MAINAN"
          | "ALAT_SEKOLAH"
          | "AKSESORIS"
    );

    await prisma.product.update({
      data: {
        nama: parsedData.data.nama,
        harga: parsedData.data.harga,
        deskripsi: parsedData.data.deskripsi,
        kategori: kategori,
        stok: parsedData.data.stok,
        warna: parsedData.data.warna,
        imageUrl: parsedData.data.imageUrl,
        sellerId: idUser,
      },
      where: {
        id: idProduct,
        sellerId: idUser,
      },
    });

    return NextResponse.json(
      { message: "Sukses mengedit produk" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[POST_PRODUCT]: ", error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { idUser: string; idProduct: string } }
) {
  try {
    const { idUser, idProduct } = await params;

    if (!idUser || !idProduct) {
      return NextResponse.json(
        { error: "Missing idUser parameter" },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: {
        id: idProduct,
        sellerId: idUser,
      },
    });

    return NextResponse.json({ message: "Berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.log("[DELETE_PRODUCT: ]", error.message);
    return NextResponse.json(error);
  }
}
