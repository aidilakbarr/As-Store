"use client";

import { z } from "zod";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import db from "@/lib/axiosInstance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(8, {
    message: "Password harus lebih dari 8 karakter",
  }),
  showPassword: z.boolean().default(false),
});

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>({});
  const [type, setType] = useState<string>("password");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse({
      email,
      password,
      showPassword,
    });

    if (!result.success) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors: any = {};
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setError(errors);
      console.log(error);
    }
    try {
      setLoading(true);
      setError({});
      const response = await db.post("api/auth/login", {
        email,
        password,
      });
      toast.success(response.data.message, {
        duration: 3000,
      });

      localStorage.setItem("token", response.data.token);

      console.log(response);

      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const { data } = error.response;
      toast.error(data.message || "Terjadi kesalahan pada server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const showPasswordFunction = () => {
      if (showPassword) {
        setType("text");
      } else {
        setType("password");
      }
    };
    showPasswordFunction();
  }, [showPassword]);

  return (
    <div className="md:grid md:grid-cols-2 md:gap-8">
      <div className="hidden md:flex">
        <Image
          src={"/assets/image/login.png"}
          alt="login-image"
          width={600}
          height={600}
          priority
        />
      </div>
      <div>
        <form
          className="flex flex-col gap-6 justify-center h-full"
          onSubmit={onSubmit}
        >
          <h1 className="text-4xl font-bold mb-6 text-center">Login</h1>
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
              type={type}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color={error.password ? "failure" : ""}
            />
            {error.password && <p className="text-red-600">{error.password}</p>}
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <Label htmlFor="remember">Show Password</Label>
          </div>
          <Button type="submit" disabled={loading}>
            Login
          </Button>
          <div className="text-center dark:text-slate-200 flex justify-center">
            <p>Dont have an account?</p>
            <Link href="/register" className="text-blue-600">
              {"  "}
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
