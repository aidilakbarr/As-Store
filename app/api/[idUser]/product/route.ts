import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as z from "zod";

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

export async function POST(
  req: Request,
  { params }: { params: { idUser: string } }
) {
  try {
    const body = await req.json();
    const { idUser } = await params;

    if (!idUser) {
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

    await prisma.product.create({
      data: {
        nama: parsedData.data.nama,
        harga: parsedData.data.harga,
        deskripsi: parsedData.data.deskripsi,
        kategori: parsedData.data.kategori,
        stok: parsedData.data.stok,
        warna: parsedData.data.warna,
        imageUrl: parsedData.data.imageUrl,
        sellerId: idUser,
      },
    });

    return NextResponse.json(
      { message: "Sukses menambahkan produk" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[POST_PRODUCT]: ", error);
    return NextResponse.json(error, { status: 500 });
  }
}
