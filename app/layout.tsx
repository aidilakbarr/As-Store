"use client";

import { Toaster } from "react-hot-toast";
import "./globals.css";
import "@/app/css/satoshi.css";
import { ThemeModeScript } from "flowbite-react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body>
        <Toaster position="top-center" />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
