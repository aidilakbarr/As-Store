-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ELEKTRONIK', 'MAINAN', 'ALAT_SEKOLAH', 'AKSESORIS');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL,
    "warna" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "kategori" "Category"[],
    "imageUrl" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sellerId" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
