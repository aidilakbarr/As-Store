"use client";

import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const isAuthenticated = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated !== null) {
      setLoading(false);
      if (!isAuthenticated) {
        console.log("Redirecting to login...");
        redirect("/login");
      }
    }
  }, [isAuthenticated]);

  if (loading) {
    return <p>Loading...</p>; // Bisa diganti dengan skeleton UI
  }

  return <>root</>;
}
