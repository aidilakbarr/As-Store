"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import db from "@/lib/axiosInstance";

const formSchema = z
  .object({
    username: z.string().min(3, { message: "Nama minimal 3 karakter" }),
    email: z.string().email({ message: "Email tidak valid" }),
    password: z.string().min(8, {
      message: "Password harus lebih dari 8 karakter",
    }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "Anda harus menyetujui syarat dan ketentuan.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan confirm password tidak sama",
    path: ["confirmPassword"],
  });

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [terms, setTerms] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse({
      username,
      email,
      password,
      confirmPassword,
      terms,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors: any = {};

    if (!result.success) {
      result.error.issues.forEach((err) => {
        errors[err.path[0]] = err.message;
        console.log((errors[err.path[0]] = err.message));
      });
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
    }

    try {
      setLoading(true);
      setError({});
      const response = await db.post("api/auth/register", {
        username,
        email,
        password,
      });

      console.log(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:grid md:grid-cols-2 md:gap-8">
      <div>
        <form
          className="flex flex-col gap-6 justify-center h-full"
          onSubmit={onSubmit}
        >
          <h1 className="text-4xl font-bold mb-6 text-center">Register</h1>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Your name" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="john smith"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              color={error.username ? "failure" : ""}
            />
            {error.username && <p className="text-red-600">{error.username}</p>}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color={error.email ? "failure" : ""}
            />
            {error.email && <p className="text-red-600">{error.email}</p>}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color={error.password ? "failure" : ""}
            />
            {error.password && <p className="text-red-600">{error.password}</p>}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirmPassword" value="Your confirm password" />
            </div>
            <TextInput
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              color={error.confirmPassword ? "failure" : ""}
            />
            {error.confirmPassword && (
              <p className="text-red-600">{error.confirmPassword}</p>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="agree"
                color={error.terms ? "failure" : ""}
                onChange={(e) => setTerms(e.target.checked)}
              />
              <Label htmlFor="agree" className="flex">
                I agree with the&nbsp;
                <Link
                  href="#"
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  terms and conditions
                </Link>
              </Label>
            </div>
            {error.terms && <p className="text-red-600 block">{error.terms}</p>}
          </div>
          <Button type="submit" disabled={loading}>
            Register
          </Button>
          <div className="text-center dark:text-slate-200 flex justify-center">
            <p>have an account?</p>
            <Link href="/register" className="text-blue-600">
              {"  "}
              Login now
            </Link>
          </div>
        </form>
      </div>
      <div className="hidden md:flex">
        <Image
          src={"/assets/image/login.png"}
          alt="login-image"
          width={600}
          height={600}
          priority
          className="w-auto h-auto"
        />
      </div>
    </div>
  );
}
