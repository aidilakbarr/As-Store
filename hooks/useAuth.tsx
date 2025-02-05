"use client";

import { useEffect } from "react";
import db from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await db.post("/api/auth/refresh");

      if (res.status !== 200) {
        router.push("/login");
      }
    };

    checkAuth();

    const interval = setInterval(checkAuth, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, [router]);
};

export default useAuth;
