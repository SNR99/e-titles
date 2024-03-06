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

export type OrganizationsColumns = Prisma.OrganizationGetPayload<{
  include: {
    users: true;
  };
}>;

export const columns: ColumnDef<OrganizationsColumns>[] = [
  {
    header: "Organization Name",
    accessorKey: "name",
  },
  {
    header: "Admins",
    accessorKey: "users",
    cell: ({ row }) => {
      const users = row.original.users;
      return <div className="pl-3 text-left">{users.length}</div>;
    },
  },
  {
    header: "Actions",
    accessorKey: "id",
    id: "actions",
    cell: ({ row }) => {
      const organization = row.original;

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

            <DropdownMenuItem>
              <Link href={`/admin/organizations/${organization.id}`}>
                View Organization
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(organization.id);
                toast("Organization copied to clipboard");
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
