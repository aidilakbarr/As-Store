import CarouselPage from "@/components/Carousel/Page";
import BestProduct from "@/components/Product/BestProduct";
import OurProduct from "@/components/Product/OurProduct";
import CategoryProduct from "@/components/Product/ProductByCategory";
import { HR } from "flowbite-react";

export default function Page() {
  return (
    <div>
      <HR className="p-0 m-0" />
      <CarouselPage />
      <BestProduct />
      <OurProduct />
      <CategoryProduct />
    </div>
  );
}
