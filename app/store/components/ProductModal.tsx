"use client";

import { HR } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

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
  {
    id: 5,
    name: "Fitbit Versa",
    price: "$299",
    rating: 4.3,
    image: "/assets/image/fitbit.jpg",
  },
  {
    id: 6,
    name: "Fitbit Versa",
    price: "$299",
    rating: 4.3,
    image: "/assets/image/fitbit.jpg",
  },
  {
    id: 7,
    name: "Fitbit Versa",
    price: "$299",
    rating: 4.3,
    image: "/assets/image/fitbit.jpg",
  },
  {
    id: 8,
    name: "Fitbit Versa",
    price: "$299",
    rating: 4.3,
    image: "/assets/image/fitbit.jpg",
  },
];

export default function ProductModal() {
  const colors = [
    { name: "Kuning", code: "bg-yellow-300" },
    { name: "Biru", code: "bg-blue-300" },
    { name: "Merah", code: "bg-red-300" },
  ];

  const sizes = ["S", "L", "XL", "XXL"];

  const [selectedColor, setSelectedColor] = useState(colors[0].code);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [quantityActive, setIsQuantityActive] = useState("");
  return (
    <>
      <div className="grid grid-cols-7 gap-6 h-[500px]">
        {/* Sidebar Gambar Kecil */}
        <div className="flex flex-col col-span-1 gap-4 h-full">
          {[...Array(3)].map((_, index) => (
            <Image
              key={index}
              src={"/assets/image/logo.jpg"}
              alt="Product Image"
              width={200}
              height={200}
              className="w-full flex-1 object-cover"
            />
          ))}
        </div>

        <div className="col-span-3 flex justify-center items-center h-full">
          <Image
            src={"/assets/image/logo.jpg"}
            alt="Product Image"
            width={1000}
            height={1000}
            className="h-full w-auto object-cover"
          />
        </div>

        <div className="col-span-3">
          <h1 className="text-slate-800 font-bold text-2xl ">Mobil</h1>
          <div className="flex gap-1 items-center">
            {[...Array(4)].map((_, index) => (
              <FaStar key={index} color="orange" />
            ))}
            <FaStar />
            <div>(150 Reviews)</div>
          </div>
          <div className="text-2xl text-slate-800 font-medium">Rp. 45.000</div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex tempora
            autem ab fuga necessitatibus est doloribus minima repellendus
            voluptate, cumque adipisci vel ratione illum iusto.
          </p>
          <HR className="my-2" />
          <div className="flex">
            <span className="mr-2 font-semibold">Warna:</span>
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color.code)}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color.code
                    ? "border-slate-700"
                    : "border-transparent"
                } ${color.code} ml-2`}
              />
            ))}
          </div>
          <div className="flex items-center mt-2">
            <span className="mr-2 font-semibold">Ukuran:</span>
            <div className="flex items-center gap-2">
              {sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-1 border-2 rounded-md ${
                    selectedSize === size
                      ? "bg-pink-400 border-pink-400 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className="mr-2 font-semibold">Jumlah:</span>
            <div className="flex items-center border rounded-md w-fit">
              <button
                onClick={() => {
                  setQuantity((prev) => Math.max(1, prev - 1));
                  setIsQuantityActive("increment");
                }}
                className={`px-4 py-2 bg-gray-200 hover:bg-pink-400 hover:text-white border-r ${
                  quantityActive === "increment" ? "bg-pink-400 text-white" : ""
                }`}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 text-center border-none focus:ring-0 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                  setIsQuantityActive("decrement");
                }}
                className={`px-4 py-2 bg-gray-200 hover:bg-pink-400 hover:text-white border-l ${
                  quantityActive === "decrement" ? "bg-pink-400 text-white" : ""
                }`}
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-2 flex">
            <button
              type="button"
              className="text-white bg-pink-400 hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 font-medium rounded-md text-sm px-14 py-2.5 me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-600"
            >
              Beli
            </button>
            <button
              type="button"
              className="text-white bg-pink-400 hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 font-medium rounded-md text-sm px-14 py-2.5 me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-600"
            >
              Masukkan ke keranjang
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center my-6">
        <div className="w-3 h-8 bg-pink-400"></div>
        <h2 className="text-pink-400 font-bold text-3xl ">Produk mirip</h2>
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
