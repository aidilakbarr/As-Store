import { Toaster } from "react-hot-toast";
import "./globals.css";
import "@/app/css/satoshi.css";
import { ThemeModeScript } from "flowbite-react";

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
        {children}
      </body>
    </html>
  );
}
