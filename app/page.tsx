"use client";

import useAuth from "@/hooks/useAuth";
import db from "@/lib/axiosInstance";
import { Button } from "flowbite-react";
import toast from "react-hot-toast";

export default function Home() {
  useAuth();

  const handleLogOut = async () => {
    try {
      const response = await db.delete("api/auth/logout");

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Button onClick={handleLogOut}>Logout</Button>
    </>
  );
}
