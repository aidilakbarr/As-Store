"use client";

import db from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const useFetchUlasan = () => {
  const params = useParams();
  const [reviews, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.idUser) return; // Pastikan idUser ada

      try {
        const response = await db.get(`api/${params.idUser}/review`);
        setReview(response.data);
      } catch (error) {
        console.error("[useFetchUlasan]: ", error);
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  return { reviews, loading, error };
};

export default useFetchUlasan;
