import { useState, useEffect } from "react";
import db from "@/lib/axiosInstance";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await db.post("/api/auth/me"); // Pakai axios instance
        setIsAuthenticated(res.data.valid);
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
      } finally {
      }
    };

    verifyToken();
  }, []);
  return isAuthenticated;
};

export default useAuth;
