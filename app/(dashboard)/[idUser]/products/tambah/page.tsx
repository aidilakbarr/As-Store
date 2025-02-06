"use client";

import UploadProductImage from "@/components/ui/uploadProductImage";
import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useEffect, useState } from "react";
import db from "@/lib/axiosInstance";
import toast from "react-hot-toast";

export const addProductSchema = z.object({
  nama: z
    .string()
    .min(3, "Nama produk minimal 3 karakter")
    .max(100, "Nama terlalu panjang"),
  harga: z
    .string()
    .min(1, "Harga wajib diisi")
    .transform((val) => Number(val))
    .refine((val) => val >= 1000 && val <= 100000000, {
      message: "Harga harus antara Rp1.000 - Rp100.000.000",
    }),
  stok: z
    .string()
    .min(1, "Stok wajib diisi")
    .transform((val) => Number(val))
    .refine((val) => val >= 1, { message: "Stok minimal 1" }),
  warna: z
    .string()
    .min(3, "Warna minimal 3 karakter")
    .max(50, "Nama warna terlalu panjang"),
  kategori: z
    .array(z.enum(["elektronik", "mainan", "alat sekolah", "aksesoris"]))
    .nonempty("Pilih minimal 1 kategori"),
  deskripsi: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter")
    .max(1000, "Deskripsi terlalu panjang"),
});

export default function AddProductForm() {
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [kategori, setKategori] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addProductSchema),
  });

  useEffect(() => {
    setValue("kategori", kategori);
  }, [kategori, setValue]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setKategori((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const onSubmit = async (data: any) => {
    if (imageURLs.length <= 0) {
      setErr("Harus upload minimal 1 gambar");
      return;
    }
    setErr(null);
    try {
      setLoading(true);
      const response = await db.post(`api/${params.idUser}/product`, {
        nama: data.nama,
        harga: data.harga,
        deskripsi: data.deskripsi,
        kategori: data.kategori,
        stok: data.stok,
        warna: data.warna,
        imageUrl: imageURLs,
      });

      toast.success(response.data.message);
      router.push(`${params.idUser}/products`);
    } catch (error) {
      console.log("[ERROR_ADD_PRODUCT]: ", error);
      toast.error(error.message || "Ada masalah pada server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <UploadProductImage imageURLs={imageURLs} setImageURLs={setImageURLs} />
        {err && <p className="text-red-500">{err}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="nama" value="Nama Produk" />
        </div>
        <TextInput id="nama" type="text" required {...register("nama")} />
        {errors.nama && (
          <p className="text-red-500">
            {(errors.nama as any)?.message || "An error occurred"}
          </p>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="harga" value="Harga" />
        </div>
        <TextInput id="harga" type="number" required {...register("harga")} />
        {errors.harga && (
          <p className="text-red-500">
            {(errors.harga as any)?.message || "An error occurred"}
          </p>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="stok" value="Stok" />
        </div>
        <TextInput id="stok" type="number" required {...register("stok")} />
        {errors.stok && (
          <p className="text-red-500">
            {(errors.stok as any)?.message || "An error occurred"}
          </p>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="warna" value="Warna Produk" />
        </div>
        <TextInput id="warna" type="text" required {...register("warna")} />
        {errors.warna && (
          <p className="text-red-500">
            {(errors.warna as any)?.message || "An error occurred"}
          </p>
        )}
      </div>
      <div className="flex max-w-md flex-col gap-4" id="checkbox">
        <div className="block">
          <Label htmlFor="kategori" value="Kategori" />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="elektronik"
            value="elektronik"
            checked={kategori.includes("elektronik")}
            onChange={handleCheckboxChange}
          />
          <Label htmlFor="elektronik">Elektronik</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="mainan"
            value="mainan"
            checked={kategori.includes("mainan")}
            onChange={handleCheckboxChange}
          />
          <Label htmlFor="mainan">Mainan</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="alat sekolah"
            value="alat sekolah"
            checked={kategori.includes("alat sekolah")}
            onChange={handleCheckboxChange}
          />
          <Label htmlFor="alat sekolah">Alat sekolah</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="aksesoris"
            value="aksesoris"
            checked={kategori.includes("aksesoris")}
            onChange={handleCheckboxChange}
          />
          <Label htmlFor="aksesoris">Aksesoris</Label>
        </div>
        {errors.kategori && (
          <p className="text-red-500">
            {(errors.kategori as any)?.message || "An error occurred"}
          </p>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="deskripsi" value="Deskripsi Produk" />
        </div>
        <Textarea id="deskripsi" required rows={4} {...register("deskripsi")} />
        {errors.deskripsi && (
          <p className="text-red-500">
            {(errors.deskripsi as any)?.message || "An error occurred"}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Link href={`/${params.idUser}/products`}>
          <Button type="reset" color="blue">
            Batal
          </Button>
        </Link>
        <Button type="submit" color="success" disabled={loading}>
          Tambah
        </Button>
      </div>
    </form>
  );
}
