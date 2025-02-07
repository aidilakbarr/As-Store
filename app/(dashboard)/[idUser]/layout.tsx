"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { ReactNode } from "react";
import "@/app/css/dashboard.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
