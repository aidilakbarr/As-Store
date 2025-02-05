"use client";

import NotificationModal from "@/components/modal/notificationModal";
import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  Navbar,
  Sidebar,
} from "flowbite-react";
import { useParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { HiChartPie, HiInbox, HiShoppingBag, HiUser } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [openModal, setOpenModal] = useState(false);
  const [navActive, setNavActive] = useState("");
  const params = useParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleNotificationModal = (open: boolean) => {
    setOpenModal(true);
    console.log(open);
  };

  const handleNav = (active: string) => {
    setNavActive(active);
  };

  return (
    <div className="flex mx-4">
      <Sidebar
        aria-label="Sidebar with logo branding example"
        className="fixed left-0 top-0 h-screen w-64 bg-white shadow-md"
      >
        <Sidebar.Logo
          href="#"
          img="/assets/image/logo.jpg"
          imgAlt="As Store logo"
        >
          As Store
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleNav("dashboard");
              }}
              className={
                navActive === "dashboard"
                  ? "text-pink-600 bg-slate-200"
                  : "text-black "
              }
            >
              <Sidebar.Item
                href={`/${params.idUser}/dashboard`}
                icon={HiChartPie}
              >
                Dashboard
              </Sidebar.Item>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleNav("inbox");
              }}
              className={
                navActive === "inbox"
                  ? "text-pink-600 bg-slate-200"
                  : "text-black "
              }
            >
              <Sidebar.Item href={`/${params.idUser}/inbox`} icon={HiInbox}>
                Inbox
              </Sidebar.Item>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleNav("users");
              }}
              className={
                navActive === "users"
                  ? "text-pink-600 bg-slate-200"
                  : "text-black "
              }
            >
              <Sidebar.Item href={`/${params.idUser}/users`} icon={HiUser}>
                Users
              </Sidebar.Item>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleNav("products");
              }}
              className={
                navActive === "products"
                  ? "text-pink-600 bg-slate-200"
                  : "text-black "
              }
            >
              <Sidebar.Item
                href={`/${params.idUser}/products`}
                icon={HiShoppingBag}
              >
                Products
              </Sidebar.Item>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      <div className="flex flex-col w-full">
        <div className="ml-64 w-full">
          <Navbar className="fixed top-0 left-64 w-[calc(100%-16rem)] bg-white shadow-md z-50">
            <h1 className="text-2xl font-bold">Selamat Datang Asmi</h1>
            <div className="flex md:order-2 gap-2">
              <div
                className="w-12 h-12 flex items-center justify-center relative cursor-pointer"
                onClick={() => handleNotificationModal(true)}
              >
                <IoIosNotifications size={30} />
                <div className="w-6 h-6 text-center bg-pink-400 rounded-full absolute top-0 right-0">
                  1
                </div>
              </div>
              <DarkThemeToggle />
              <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar alt="User settings" rounded />}
              >
                <Dropdown.Header>
                  <span className="block text-sm">Bonnie Green</span>
                  <span className="block truncate text-sm font-medium">
                    name@flowbite.com
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
          </Navbar>
        </div>

        <main className="ml-64 mt-16 p-4">
          <h2 className="text-xl font-semibold">Konten Utama</h2>
          {children}
        </main>
      </div>
      <NotificationModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
