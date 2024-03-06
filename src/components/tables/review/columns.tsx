"use client";

import { Prisma } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export type ApplicationColumns = Prisma.ApplicationGetPayload<{
  include: {
    property: true;
    applicant: true;
  };
}>;

export const columns: ColumnDef<ApplicationColumns>[] = [
  {
    header: "Applicant",
    cell: ({ row }) => {
      const name = row.original.applicant.name;
      const surname = row.original.applicant.surname;

      return <div className="font-medium">{`${name} ${surname}`}</div>;
    },
  },
  {
    header: "Address",
    accessorKey: "property.address",
  },
  {
    header: "Status",
    accessorKey: "status",
  },

  {
    accessorKey: "property.value",
    header: "Value",
    cell: ({ row }) => {
      const value = row.original.property.value;
      const currency = row.original.property.currency;

      return <>{formatCurrency(value, currency)}</>;
    },
  },
  {
    header: "Actions",
    accessorKey: "id",
    id: "actions",
    cell: ({ row }) => {
      const application = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8  p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => {
                console.log(application);
              }}
            >
              <Link href={`/org/applications/${application.id}`}>
                View Application
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(application.id);
                toast("ID copied to clipboard");
              }}
            >
              Copy ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
