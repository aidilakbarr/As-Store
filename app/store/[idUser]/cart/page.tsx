"use client";

import { Button, HR, Table, TextInput } from "flowbite-react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/redux/slices/cartSlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HiSearch } from "react-icons/hi";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const params = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4 text-slate-800">
        Keranjang Belanja
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Keranjang masih kosong 😢</p>
      ) : (
        <Table>
          <Table.Head>
            <Table.HeadCell>Produk</Table.HeadCell>
            <Table.HeadCell>Harga</Table.HeadCell>
            <Table.HeadCell>Jumlah</Table.HeadCell>
            <Table.HeadCell>Total</Table.HeadCell>
            <Table.HeadCell>Aksi</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {cartItems.map((item) => (
              <Table.Row
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <Image
                    src={item.imageUrl?.[0] || "/default-image.jpg"} // Handle jika image kosong
                    alt={item.nama}
                    className="w-16 h-16 object-cover"
                    width={50}
                    height={50}
                    priority
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.harga}
                </Table.Cell>
                <Table.Cell>{item.jumlah}</Table.Cell>
                <Table.Cell>{item.total}</Table.Cell>

                <Button
                  color="failure"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Hapus
                </Button>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      <Link href={`/store/${params.idUser}`}>
        <button
          type="button"
          className="text-pink-400 hover:text-white border border-pink-400 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-pink-500 dark:text-pink-500 dark:hover:text-white dark:hover:bg-pink-500 dark:focus:ring-pink-600 my-6"
        >
          Kembali
        </button>
      </Link>
      <div className="grid grid-cols-2">
        <form
          action="https://formbold.com/s/unique_form_id"
          method="POST"
          className="flex gap-2 items-start"
        >
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 max-w-xs"
            required
            placeholder="Kode Kupon"
          />
          <button
            type="button"
            className="text-white bg-pink-400 hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-400 focus:outline-none dark:focus:ring-pink-600"
          >
            Gunakan
          </button>
        </form>
        <div className="bg-white border-2 border-pink-400 rounded-xl p-4">
          <h3 className="font-bold text-2xl text-slate-900">Total Cart</h3>
          <div className="flex justify-between">
            <div className="text-slate-800">Total Product</div>
            <div className="text-slate-800">Rp. 1.500.000</div>
          </div>
          <HR className="my-2" />
          <div className="flex justify-between">
            <div className="text-slate-800">Total Pengantaran</div>
            <div className="text-slate-800">Rp. 10.000</div>
          </div>
          <HR className="my-2" />
          <div className="flex justify-between">
            <div className="text-slate-800">Total</div>
            <div className="text-slate-800">Rp. 1.510.000</div>
          </div>
          <HR className="my-2" />
          <div className="flex justify-center">
            <button
              type="button"
              className="text-white mt-2 bg-pink-400 hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-400 focus:outline-none dark:focus:ring-pink-600 px-12"
            >
              Pesan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
