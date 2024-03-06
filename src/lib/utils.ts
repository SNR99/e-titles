import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const formatCurrency = (value: number, currency: string) => {
  return `${currency} ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$& ")}`;
};

/*

export const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency,
  })
    .format(value)
    .replaceAll(",", " ");
};


*/

export const BASE_URL = process.env.HOST_BASE_URL || "http://localhost:3000";
