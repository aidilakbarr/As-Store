"use client";

import { Button, Pagination, Table } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import useFetchAllUser from "@/hooks/useFetchAllUser";
import DeleteUserModal from "@/components/modal/deleteUserModal";
import SearchPage from "@/components/ui/search";

const ITEMS_PER_PAGE = 15;

export default function UserPage() {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [idUserDelete, setIdUserDelete] = useState("");
  const [filteredData, setFilteredData] = useState<string[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { users } = useFetchAllUser();

  useEffect(() => {
    const filtered = users?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
    console.log({ users });
  }, [search, users]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const modalOpen = (id: string) => {
    setOpenModal(true);
    setIdUserDelete(id);
  };

  return (
    <div className="overflow-x-auto">
      <div className="max-w-96 mb-5 mt-2 flex flex-end">
        <SearchPage search={search} setSearch={setSearch} />
      </div>

      <Table>
        <Table.Head>
          <Table.HeadCell>Profile</Table.HeadCell>
          <Table.HeadCell>Nama</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Alamat</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {paginatedData && paginatedData?.length >= 1 ? (
            paginatedData.map((user) => (
              <Table.Row
                key={user.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <Image
                    src={
                      user.profile ||
                      "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?t=st=1738929344~exp=1738932944~hmac=8e8786edbb95c0b9691687a9d5a5dc20adc0f1673530129168013bf9bf2fe3ab&w=740"
                    } // Menampilkan gambar pertama dari array
                    alt={user.name}
                    className="w-16 h-16 object-cover"
                    width={50}
                    height={50}
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {user.name}
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.phone || "Kosong"}</Table.Cell>
                <Table.Cell>{user.alamat || "Kosong"}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button color="failure" onClick={() => modalOpen(user.id)}>
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
      <DeleteUserModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        idUserDelete={idUserDelete}
      />
    </div>
  );
}
