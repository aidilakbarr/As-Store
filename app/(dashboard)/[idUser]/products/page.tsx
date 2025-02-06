"use client";

import { Button, Table } from "flowbite-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import useFetchProduct from "@/hooks/useFetchProduct";
import Image from "next/image";

export default function ProductPage() {
  const params = useParams();

  const { products } = useFetchProduct();

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div className="overflow-x-auto">
      <Link href={`/${params.idUser}/products/tambah`}>
        <Button color="blue">
          <FaPlus className="w-5 h-5 mr-2" />
          Tambah Product
        </Button>
      </Link>

      <Table>
        <Table.Head>
          <Table.HeadCell>Gambar</Table.HeadCell>
          <Table.HeadCell>Nama</Table.HeadCell>
          <Table.HeadCell>Warna</Table.HeadCell>
          <Table.HeadCell>Kategori</Table.HeadCell>
          <Table.HeadCell>Stok</Table.HeadCell>
          <Table.HeadCell>Harga</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {products &&
            products.map((product) => (
              <Table.Row
                key={product.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <Image
                    src={product.imageUrl} // Menampilkan gambar pertama dari array
                    alt={product.nama}
                    className="w-16 h-16 object-cover"
                    width={50}
                    height={50}
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {product.nama}
                </Table.Cell>
                <Table.Cell>{product.warna}</Table.Cell>
                <Table.Cell>{product.kategori.join(", ")}</Table.Cell>
                <Table.Cell>{product.stok}</Table.Cell>
                <Table.Cell>{`Rp${product.harga.toLocaleString()}`}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Link href={`/${params.idUser}/products/${product.id}/edit`}>
                    <Button color="warning">Edit</Button>
                  </Link>
                  <Button color="failure">Delete</Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}
