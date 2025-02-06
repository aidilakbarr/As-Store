import { Sidebar } from "flowbite-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import {
  HiChartPie,
  HiInbox,
  HiLogout,
  HiShoppingBag,
  HiShoppingCart,
  HiUser,
} from "react-icons/hi";

export default function DashboardSidebar() {
  const [navActive, setNavActive] = useState("dashboard");
  const router = useRouter();
  const params = useParams();

  const handleNav = (active: string) => {
    setNavActive(active);
    router.push(`/${params.idUser}/${active}`);
  };

  return (
    <>
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
                navActive === "dashboard" ? "bg-slate-200" : "text-black "
              }
            >
              <Sidebar.Item icon={HiChartPie}>
                <span
                  className={navActive === "dashboard" ? "text-pink-600" : ""}
                >
                  Dashboard
                </span>
              </Sidebar.Item>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleNav("products");
              }}
              className={
                navActive === "products" ? "bg-slate-200" : "text-black "
              }
            >
              <Sidebar.Item icon={HiShoppingBag}>
                <span
                  className={navActive === "products" ? "text-pink-600" : ""}
                >
                  Products
                </span>
              </Sidebar.Item>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleNav("pesanan");
              }}
              className={
                navActive === "pesanan" ? "bg-slate-200" : "text-black "
              }
            >
              <Sidebar.Item icon={HiShoppingCart}>
                <span
                  className={navActive === "pesanan" ? "text-pink-600" : ""}
                >
                  Pesanan
                </span>
              </Sidebar.Item>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleNav("ulasan");
              }}
              className={
                navActive === "ulasan" ? "bg-slate-200" : "text-black "
              }
            >
              <Sidebar.Item icon={FaCommentDots}>
                <span className={navActive === "ulasan" ? "text-pink-600" : ""}>
                  Ulasan
                </span>
              </Sidebar.Item>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleNav("inbox");
              }}
              className={navActive === "inbox" ? "bg-slate-200" : "text-black "}
            >
              <Sidebar.Item icon={HiInbox}>
                <span className={navActive === "inbox" ? "text-pink-600" : ""}>
                  Inbox
                </span>
              </Sidebar.Item>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleNav("users");
              }}
              className={navActive === "users" ? "bg-slate-200" : "text-black "}
            >
              <Sidebar.Item icon={HiUser}>
                <span className={navActive === "users" ? "text-pink-600" : ""}>
                  Users
                </span>
              </Sidebar.Item>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleNav("logout");
              }}
              className={
                navActive === "logout" ? "bg-slate-200" : "text-black "
              }
            >
              <Sidebar.Item icon={HiLogout}>
                <span className={navActive === "logout" ? "text-pink-600" : ""}>
                  Logout
                </span>
              </Sidebar.Item>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      ;
    </>
  );
}
