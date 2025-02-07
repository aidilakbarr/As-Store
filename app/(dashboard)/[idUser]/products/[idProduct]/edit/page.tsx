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
});

export default function EditProductForm() {
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [kategori, setKategori] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const { idUser, idProduct } = useParams();
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
    // Fetch data produk berdasarkan idUser dan idProduct
    const fetchProduct = async () => {
      try {
        const response = await db.get(`/api/${idUser}/product/${idProduct}`);
        const product = response.data;

        // Set form values dengan data produk
        setValue("nama", product.nama);
        setValue("harga", product.harga);
        setValue("stok", product.stok);
        setValue("warna", product.warna);
        setValue("deskripsi", product.deskripsi);
        setKategori(product.kategori);
        setImageURLs(product.imageUrl);
      } catch (error) {
        toast.error("Gagal mengambil data produk");
        console.log("[ERROR_FETCH_PRODUCT]:", error);
      }
    };

    fetchProduct();
  }, [idUser, idProduct, setValue]);

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
      const response = await db.put(`api/${idUser}/product/${idProduct}`, {
        nama: data.nama,
        harga: data.harga,
        deskripsi: data.deskripsi,
        kategori: data.kategori,
        stok: data.stok,
        warna: data.warna,
        imageUrl: imageURLs,
      });

      toast.success(response.data.message);
      router.push(`/${idUser}/products`);
    } catch (error) {
      console.log("[ERROR_EDIT_PRODUCT]: ", error);
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
            id="ELEKTRONIK"
            value="ELEKTRONIK"
            checked={kategori.includes("ELEKTRONIK")}
            onChange={handleCheckboxChange}
          />
          <Label htmlFor="ELEKTRONIK">Elektronik</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="MAINAN"
            value="MAINAN"
            checked={kategori.includes("MAINAN")}
            onChange={handleCheckboxChange}
          />
          <Label htmlFor="MAINAN">Mainan</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="ALAT_SEKOLAH"
            value="ALAT_SEKOLAH"
            checked={kategori.includes("ALAT_SEKOLAH")}
            onChange={handleCheckboxChange}
          />
          <Label htmlFor="ALAT_SEKOLAH">Alat sekolah</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="AKSESORIS"
            value="AKSESORIS"
            checked={kategori.includes("AKSESORIS")}
            onChange={handleCheckboxChange}
          />
          <Label htmlFor="AKSESORIS">Aksesoris</Label>
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
        <Link href={`/${idUser}/product`}>
          <Button type="reset" color="blue">
            Batal
          </Button>
        </Link>
        <Button type="submit" color="success" disabled={loading}>
          Simpan Perubahan
        </Button>
      </div>
    </form>
  );
}
