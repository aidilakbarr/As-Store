"use client";

import NotificationModal from "@/components/modal/notificationModal";
import DashboardNavbar from "@/components/navbar";
import DashboardSidebar from "@/components/sidebar";
import React, { ReactNode, useState } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex mx-6">
      <DashboardSidebar />
      <div className="flex flex-col w-full">
        <DashboardNavbar setOpenModal={setOpenModal} />
        <main className="ml-56 mt-16 p-4">{children}</main>
      </div>
      <NotificationModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
