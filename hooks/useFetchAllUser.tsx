"use client";

import db from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const useFetchAllUser = () => {
  const params = useParams();
  const [users, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!params.idUser) return; // Pastikan idUser ada

      try {
        const response = await db.get(`api/${params.idUser}/get-all-user`);
        setUser(response.data);
      } catch (error) {
        console.error("[useFetchAllUser]: ", error);
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params]);

  return { users, loading, error };
};

export default useFetchAllUser;
