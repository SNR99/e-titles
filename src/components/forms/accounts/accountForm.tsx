"use client";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { AdminSchema, AdminSchemaType } from "@/lib/schemaValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import FormError from "@/components/form-error";
import Loader from "@/components/Loader";
import FormSuccess from "@/components/form-success";
import { useRouter } from "next/navigation";
import { newAccount } from "@/actions/accounts/new-account";

export default function AccountForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<AdminSchemaType>({
    resolver: zodResolver(AdminSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      role: "ADMIN",
      organization: "",
    },
    mode: "onChange",
  });

  const orgs = ["Rand Merchant Bank", "First National Bank", "ABSA", "Nedbank"];
  const router = useRouter();

  const onSubmit = (data: AdminSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newAccount(data).then((result) => {
        setError(result.error);
        setSuccess(result.success);
        if (result.success) {
          router.push(`/admin/accounts/${result.success}`);
        }
      });
    });
  };

  return (
    <>
      <Loader loading={pending} />
      <FormError message={error} />
      <FormSuccess message={success && "Account created"} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="grid gap-2 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"ADMIN"}>Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the role of the user you are creating
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an organization" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {orgs.map((org, index) => (
                        <SelectItem key={index} value={org}>
                          {org}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the organization the user belongs to
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-6 flex justify-end">
            <Button className="w-28" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
