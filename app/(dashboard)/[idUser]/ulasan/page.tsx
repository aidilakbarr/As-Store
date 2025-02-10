"use client";

import { Button, Pagination, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import SearchPage from "@/components/ui/search";
import DeleteReviewModal from "@/components/modal/deleteReviewModal";
import useFetchUlasan from "@/hooks/usefetchReviews";

const ITEMS_PER_PAGE = 15;

export default function UlasanPage() {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [idReview, setIdReview] = useState("");
  const [filteredData, setFilteredData] = useState<string[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { reviews } = useFetchUlasan();

  useEffect(() => {
    const filtered = reviews?.filter((item) =>
      item.user?.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [search, reviews]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const modalOpen = (id: string) => {
    setOpenModal(true);
    setIdReview(id);
  };

  return (
    <div className="overflow-x-auto">
      <div className="max-w-96 mb-5 mt-2 flex flex-end">
        <SearchPage search={search} setSearch={setSearch} />
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Tanggal</Table.HeadCell>
          <Table.HeadCell>Nama</Table.HeadCell>
          <Table.HeadCell>Rating</Table.HeadCell>
          <Table.HeadCell>Komentar</Table.HeadCell>
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
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {new Date(item.createdAt).toLocaleString()}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.user?.name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {"⭐".repeat(item.rating)}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.comment}
                </Table.Cell>
                <Table.Cell className="flex gap-2">
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
      <DeleteReviewModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        idReviewDelete={idReview}
      />
    </div>
  );
}
