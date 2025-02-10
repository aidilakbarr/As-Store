"use client";

import db from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const useFetchProduct = () => {
  const params = useParams();
  const [products, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.idUser) return; // Pastikan idUser ada

      try {
        const response = await db.get(`api/${params.idUser}/product`);
        setProduct(response.data);
      } catch (error) {
        console.error("[useFetchProduct]: ", error);
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  return { products, loading, error };
};

export default useFetchProduct;
