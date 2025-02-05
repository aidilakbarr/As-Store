"use client";

import db from "@/lib/axiosInstance";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiMail } from "react-icons/hi";
import * as z from "zod";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const emailSchema = z.object({
    email: z.string().email({ message: "Email tidak valid" }),
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse({ email });

    if (!result.success) {
      result.error.issues.forEach((err) => {
        setError(err.message);
      });
    }

    if (result.success) {
      try {
        setLoading(true);
        setError("");
        const response = await db.post("api/auth/forgot-password", {
          email,
        });

        toast.success(response.data.message);
        router.push("/reset-password");
      } catch (error) {
        setError(error.message || "Ada masalah pada server");
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
            <Label htmlFor="email4" value="Your email" />
          </div>
          <TextInput
            id="email4"
            type="email"
            icon={HiMail}
            placeholder="name@flowbite.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            color={error ? "failure" : ""}
          />
          {error && <p className="text-red-600">{error}</p>}
          <Button type="submit" className="mt-4" disabled={loading}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
