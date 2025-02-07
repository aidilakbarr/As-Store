"use client";

import db from "@/lib/axiosInstance";
import { Button, Modal } from "flowbite-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface DeleteUserModalInterface {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
  idUserDelete: string;
}

const DeleteUserModal: React.FC<DeleteUserModalInterface> = ({
  openModal,
  setOpenModal,
  idUserDelete,
}) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await db.delete(
        `api/${params.idUser}/user/${idUserDelete}`
      );
      toast.success(response.data.message);
      setOpenModal(false);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Ada masalah pada server");
      console.log("[DELETE_PRODUCT]: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      show={openModal}
      size="md"
      onClose={() => setOpenModal(false)}
      popup
      position="center"
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Apakah kamu yakin untuk hapus produk ini?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={() => {
                onDelete();
              }}
              disabled={loading}
            >
              {"Yes, I'm sure"}
            </Button>
            <Button
              color="gray"
              onClick={() => setOpenModal(false)}
              disabled={loading}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteUserModal;
