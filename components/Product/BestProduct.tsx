import { Button } from "flowbite-react";
import ProductCarousel from "./ProductBestCarousel";

export default function BestProduct() {
  return (
    <>
      <div className="flex justify-between my-6">
        <h1 className="text-3xl font-semibold text-slate-800">
          Produk Paling Laku
        </h1>
        <Button
          className="bg-pink-400 text-white hover:text-slate-800"
          color="pink"
        >
          Liat Semua
        </Button>
      </div>
      <ProductCarousel />
    </>
  );
}
