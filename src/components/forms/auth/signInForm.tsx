"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignInSchema, SignInType } from "@/lib/schemaValidator";
import { useState, useTransition } from "react";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { signInHandler } from "@/actions/auth/sign-in";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SignInForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    mode: "onChange",
    defaultValues: {
      email: email || "",
      password: "",
    },
  });

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = (data: SignInType) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      signInHandler(data).then((result) => {
        setError(result?.error);
        setSuccess(result?.success);
      });
    });
  };

  return (
    <>
      <FormError message={error} />
      <FormSuccess message={success} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password*</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Link
                className="text-center text-xs tracking-wide text-blue-500 underline underline-offset-2"
                href={"/forgot-password"}
              >
                Forgot password?
              </Link>
            </div>

            <Button
              disabled={pending}
              className="w-full bg-black hover:bg-black/80"
              type="submit"
            >
              Sign in
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
