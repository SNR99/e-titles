"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  PropertySchema,
  PropertyType,
  currencyOptions,
} from "@/lib/schemaValidator";
import { useFormContext } from "@/context/FormContext";

export default function PropertyForm({ onBack, onNext }: any) {
  const {
    state: { propertyApplication },
    updatePropertyApplication,
  } = useFormContext();

  const form = useForm<PropertyType>({
    resolver: zodResolver(PropertySchema),
    defaultValues: propertyApplication,
  });

  const propertyType = useWatch({
    control: form.control,
    name: "type",
  });

  const onSubmit = (data: PropertyType) => {
    updatePropertyApplication(data);
    onNext();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  placeholder="To implement Google places api"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                required
                defaultValue="ZAR"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Please select the type of the property you are applying for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {propertyType === "Other" && (
          <FormField
            control={form.control}
            name="other"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Property Type</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Please specify the type of the property you are applying for.
                </FormDescription>
              </FormItem>
            )}
          />
        )}
        <div className="space-y-2">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="w-[180px]">
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={""}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      {currencyOptions.map((currency, index) => (
                        <SelectItem key={index} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormDescription>
            Please provide the value of the property and the currency.
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="financingInstitution"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Financing Institution</FormLabel>
              <Select onValueChange={field.onChange} defaultValue="" required>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                  {FINANCING_INSTITUTION.map((institution, index) => (
                    <SelectItem key={index} value={institution}>
                      {institution}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
              <FormDescription>
                Please select the financing institution for the property.
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="my-6 flex justify-end gap-2">
          <Button
            type="button"
            className="text:gray-800 w-28 border border-gray-800 bg-transparent text-gray-800 hover:border-gray-800 hover:bg-transparent hover:text-gray-800"
            onClick={onBack}
          >
            Back
          </Button>
          <Button className="w-28" type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}

const PROPERTY_TYPES = [
  "Residential",
  "Commercial",
  "Industrial",
  "Land",
  "Agricultural",
  "Other",
];

const FINANCING_INSTITUTION = [
  "ABSA",
  "FNB",
  "Nedbank",
  "Standard Bank",
  "Wesbank",
];
