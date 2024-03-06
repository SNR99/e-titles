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
import {
  ApplicantDetailsType,
  ApplicantDetailsSchema,
} from "@/lib/schemaValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm, useWatch } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "@/context/FormContext";

export default function ApplicantDetailsForm({
  onNext,
  user,
}: {
  onNext: () => void;
  user: {
    name: string;
    surname: string;
    email: string;
  };
}) {
  const { updateApplicantDetails } = useFormContext();

  const form = useForm<ApplicantDetailsType>({
    resolver: zodResolver(ApplicantDetailsSchema),
    defaultValues: {
      name: user.name,
      surname: user.surname,
      email: user.email,
      identityType: undefined,
      identificationNumber: "",
    },
    mode: "onChange",
  });
  const identityType = useWatch({
    control: form.control,
    name: "identityType",
  });

  const onSubmit = (data: ApplicantDetailsType) => {
    updateApplicantDetails(data);

    console.log(data);
    onNext();
  };

  return (
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
                    <Input {...field} required readOnly />
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
                    <Input {...field} required readOnly />
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
                  <Input {...field} type="email" required readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="identityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Identity Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={""}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Identity type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"NATIONAL_ID"}>RSA ID</SelectItem>
                    <SelectItem value={"PASSPORT"}>Passport</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the type of identity you are using (RSA ID or an
                  Passport).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {identityType && (
            <FormField
              control={form.control}
              name="identificationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    {identityType === "NATIONAL_ID"
                      ? "RSA National Number"
                      : "Passport Number"}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {identityType && (
          <div className="my-6 flex justify-end">
            <Button className="w-28" type="submit">
              Next
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
