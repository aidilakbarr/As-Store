import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen mx-4">
      {children}
    </div>
  );
}
