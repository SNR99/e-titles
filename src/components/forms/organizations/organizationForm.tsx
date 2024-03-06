"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components//ui/button";
import { capitalize } from "@/lib/utils";
import { useState, useTransition } from "react";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import FormError from "@/components/form-error";
import {
  OrganizationSchema,
  OrganizationType,
  organization_type,
} from "@/lib/schemaValidator";
import FormSuccess from "@/components/form-success";
import { newOrganization } from "@/actions/organizations/new-organization";

export default function OrganizationForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<OrganizationType>({
    defaultValues: {
      name: "",
      orgType: undefined,
      abbreviation: "",
    },
    mode: "onChange",
    resolver: zodResolver(OrganizationSchema),
  });

  const router = useRouter();

  const onSubmit = (data: OrganizationType) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newOrganization(data).then((result) => {
        setError(result.error);

        if (result.success) {
          router.push(`/admin/organizations/${result.success}`);
        }
      });
    });
  };
  return (
    <>
      <Loader loading={pending} />
      <FormError message={error} />
      <FormSuccess message={success} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the full name of the organization
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="abbreviation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Abbreviated Name</FormLabel>
                  <FormControl>
                    <Input {...field} max={10} />
                  </FormControl>
                  <FormDescription>
                    Enter the abbreviated name of the organization
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orgType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an Organization type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {organization_type.map((type, index) => (
                        <SelectItem key={index} value={type}>
                          {capitalize(type).replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the type of organization you are adding
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-10 flex justify-end">
            <Button className="w-[100px]"> Save </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
