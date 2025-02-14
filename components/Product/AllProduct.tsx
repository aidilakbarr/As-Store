"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

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

export default function AllProduct() {
  const params = useParams();
  const dispatch = useDispatch();

  const addCart = (product: any) => {
    dispatch(addToCart(product));
    toast.success("Produk ditambahkan di cart");
  };
  return (
    <>
      <div className="flex justify-between my-6">
        <h1 className="text-3xl font-semibold text-slate-800">Product Kami</h1>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[250px] snap-start bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <Link href={`/store/${params.idUser}/${product.id}`}>
              <Image
                className="rounded-t-lg"
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
              />
            </Link>
            <div className="px-5 pb-5 flex flex-col justify-between">
              <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                {product.name}
              </h5>
              <div className="flex gap-1 items-center">
                {[...Array(4)].map((_, index) => (
                  <FaStar key={index} color="orange" />
                ))}
                <FaStar />
                <div>(150 Reviews)</div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {product.price}
                </span>
                <button
                  onClick={() => addCart(product)}
                  className="text-white bg-pink-400 hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 font-medium rounded-md text-sm px-6 py-2.5 me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-600"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
