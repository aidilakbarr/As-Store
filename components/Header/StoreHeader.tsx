"use client";

import { IoCartOutline } from "react-icons/io5";
import SearchPage from "../ui/search";
import { useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function StoreHeader() {
  const [search, setSearch] = useState("");
  const params = useParams();
  const pathName = usePathname();

  // Daftar menu navigasi
  const navLinks = [
    { name: "Beranda", path: `/store/${params.idUser}` },
    { name: "Produk", path: `/store/${params.idUser}/produk` },
    { name: "Tentang", path: `/store/${params.idUser}/tentang` },
    { name: "Kontak", path: `/store/${params.idUser}/kontak` },
  ];

  const isActive = (path: string) => pathName === path;

  return (
    <div className="flex justify-between py-2 items-center">
      <Link href={`/store/${params.idUser}`}>
        <h1 className="text-3xl font-semibold text-slate-800">
          As <span className="text-pink-400">Store</span>
        </h1>
      </Link>
      <nav>
        <ul className="flex gap-2">
          {navLinks.map(({ name, path }) => (
            <Link key={name} href={path}>
              <li
                className={`text-slate-800 text-lg font-medium hover:text-pink-400 hover:bg-slate-200 m-2 px-2 rounded-t-xl rounded-none transition duration-300 border-b-2 ${
                  isActive(path)
                    ? "border-pink-400 text-pink-400"
                    : "border-transparent"
                }`}
              >
                {name}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <div className="flex gap-2">
        <SearchPage search={search} setSearch={setSearch} />
        <Link href={`/store/${params.idUser}/cart`}>
          <IoCartOutline className="h-10 w-10 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}
