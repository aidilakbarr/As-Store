"use client";

import { Button, Pagination, Table } from "flowbite-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import useFetchProduct from "@/hooks/useFetchProduct";
import Image from "next/image";
import { useEffect, useState } from "react";
import DeleteModal from "@/components/modal/deleteModal";
import SearchPage from "@/components/ui/search";

const ITEMS_PER_PAGE = 1;

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [filteredData, setFilteredData] = useState<string[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams();

  const { products } = useFetchProduct();

  useEffect(() => {
    const filtered = products?.filter((item) =>
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [search, products]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const modalOpen = (id: string) => {
    setOpenModal(true);
    setIdProduct(id);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-6 pt-2">
        <Link href={`/${params.idUser}/products/tambah`}>
          <Button color="blue">
            <FaPlus className="w-5 h-5 mr-2" />
            Tambah Product
          </Button>
        </Link>
        <SearchPage search={search} setSearch={setSearch} />
      </div>

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
          {paginatedData && paginatedData?.length >= 1 ? (
            paginatedData.map((item) => (
              <Table.Row
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <Image
                    src={item.imageUrl[0]}
                    alt={item.nama}
                    className="w-16 h-16 object-cover"
                    width={50}
                    height={50}
                    priority
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.nama}
                </Table.Cell>
                <Table.Cell>{item.warna}</Table.Cell>
                <Table.Cell>{item.kategori.join(", ")}</Table.Cell>
                <Table.Cell>{item.stok}</Table.Cell>
                <Table.Cell>{`Rp${item.harga.toLocaleString()}`}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Link href={`/${params.idUser}/products/${item.id}/edit`}>
                    <Button color="warning">Edit</Button>
                  </Link>
                  <Button color="failure" onClick={() => modalOpen(item.id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell className="whitespace-nowrap font-bold text-gray-900 dark:text-white text-center">
                Data tidak ditemukan 😢
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      {filteredData && filteredData.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / ITEMS_PER_PAGE)}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
      <DeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        idProduct={idProduct}
      />
    </div>
  );
}
