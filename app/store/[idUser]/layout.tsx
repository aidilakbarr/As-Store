"use client";

import StoreHeader from "@/components/Header/StoreHeader";
import StoreFooter from "@/components/Product/Footer";
import { ReactNode } from "react";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="px-12">
        <StoreHeader />
        {children}
      </div>
      <StoreFooter />
    </>
  );
}
