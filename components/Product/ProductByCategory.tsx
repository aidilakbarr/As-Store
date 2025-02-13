"use client";

import { useState } from "react";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Apple Watch",
    price: "$599",
    rating: 5.0,
    image: "/assets/image/logo.jpg",
  },
  {
    id: 2,
    name: "Samsung Galaxy Watch",
    price: "$499",
    rating: 4.8,
    image: "/assets/image/samsung-watch.jpg",
  },
  {
    id: 3,
    name: "Garmin Smartwatch",
    price: "$399",
    rating: 4.5,
    image: "/assets/image/garmin.jpg",
  },
  {
    id: 4,
    name: "Fitbit Versa",
    price: "$299",
    rating: 4.3,
    image: "/assets/image/fitbit.jpg",
  },
];

const categorys = [
  { id: 1, name: "Komputer" },
  { id: 2, name: "Laptop" },
  { id: 3, name: "Iphone" },
  { id: 4, name: "Android" },
  { id: 5, name: "MacOs" },
  { id: 6, name: "Windows" },
];

export default function CategoryProduct() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <>
      <div className="flex justify-between my-6">
        <h1 className="text-3xl font-semibold text-slate-800">
          Cari berdasarkan kategori
        </h1>
      </div>
      <div className="grid grid-cols-6 gap-6 mb-4">
        {categorys.map((category) => (
          <div
            key={category.id}
            className={`border border-gray-200 rounded-lg shadow-sm h-20 flex justify-center items-center cursor-pointer
              ${
                selectedCategory === category.id
                  ? "bg-pink-400 text-white"
                  : "bg-white text-black"
              }
              hover:bg-pink-400 hover:text-white transition-all`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[250px] snap-start bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <Image
              className="rounded-t-lg"
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
            />
            <div className="px-5 pb-5 flex flex-col justify-between">
              <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                {product.name}
              </h5>
              <div className="mt-2.5 mb-5">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800">
                  {product.rating}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {product.price}
                </span>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
