"use client";

import db from "@/lib/axiosInstance";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import * as z from "zod";

export default function Page() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formSchema = z.object({
    otp: z
      .string()
      .min(6, "OTP harus berisi 6 angka")
      .max(6, "OTP harus berisi 6 angka"),
    newPassword: z.string().min(8, "Password minimal 8 karakter"),
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse({ otp, newPassword });

    if (!result.success) {
      const errors: any = {};
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setError(errors);
    }

    if (result.success) {
      try {
        setLoading(true);
        setError("");
        const response = await db.post("api/auth/reset-password", {
          otp,
          newPassword,
        });
        toast.success(response.data.message);
        router.push("/");
      } catch (error) {
        toast.error(error.message || "Ada masalah pada server");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <form
        className="flex flex-col gap-6 justify-center h-full"
        onSubmit={onSubmit}
      >
        <h1 className="text-4xl font-bold mb-6 text-center">Forgot Password</h1>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="otp" value="Your OTP" />
          </div>
          <TextInput
            id="otp"
            type="number"
            icon={FaLock}
            placeholder="123456"
            required
            value={otp || ""}
            onChange={(e) => setOtp(e.target.value)}
            disabled={loading}
            color={error.otp ? "failure" : ""}
          />
          {error.otp && <p className="text-red-600">{error.otp}</p>}
          <div className="mb-2 block">
            <Label htmlFor="newPassword" value="Your New Password" />
          </div>
          <TextInput
            id="newPassword"
            type="text"
            icon={MdOutlinePassword}
            required
            placeholder="*****"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
            color={error.newPassword ? "failure" : ""}
          />
          {error.newPassword && (
            <p className="text-red-600">{error.newPassword}</p>
          )}
          <Button type="submit" className="mt-4" disabled={loading}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
