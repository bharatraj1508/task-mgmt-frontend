"use client";

import { useState } from "react";
import { ListChecks } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { registerUser } from "@/services/auth"; // Import the registerUser function

// Define schema using zod
const schema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address!" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match!",
  });

type Inputs = z.infer<typeof schema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  // States to manage success or error messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      setErrorMessage(null);
      setSuccessMessage(null);

      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      };

      const response = await registerUser(userData);
      setSuccessMessage(response.message);
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred");
    }
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <ListChecks className="size-10" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">School Management System</h1>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </div>
          {successMessage && (
            <p className="text-sm text-green-500 text-center mt-4">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-sm text-red-500 text-center mt-4">
              {errorMessage}
            </p>
          )}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  {...register("firstName")}
                  placeholder="John"
                />
                {errors.firstName?.message && (
                  <p className="text-xs text-red-400">
                    {errors.firstName?.message.toString()}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  {...register("lastName")}
                  placeholder="Doe"
                />
                {errors.lastName?.message && (
                  <p className="text-xs text-red-400">
                    {errors.lastName?.message.toString()}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="m@example.com"
              />
              {errors.email?.message && (
                <p className="text-xs text-red-400">
                  {errors.email?.message.toString()}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="********"
              />
              {errors.password?.message && (
                <p className="text-xs text-red-400">
                  {errors.password?.message.toString()}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                placeholder="********"
              />
              {errors.confirmPassword?.message && (
                <p className="text-xs text-red-400">
                  {errors.confirmPassword?.message.toString()}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full hover:bg-white hover:text-red-500 hover:border border-red-500 transition-all duration-300"
            >
              Signup
            </Button>
          </div>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
