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

export type UsersColumns = Prisma.UserGetPayload<{
  include: {
    organization: true;
  };
}>;

export const columns: ColumnDef<UsersColumns>[] = [
  {
    header: "Full name",
    cell: ({ row }) => {
      const name = row.original.name;
      const surname = row.original.surname;

      return <div className="font-medium">{`${name} ${surname}`}</div>;
    },
  },

  {
    header: "Role",
    accessorKey: "role",
  },

  {
    header: "Organization",
    accessorKey: "organization.abbreviation",
  },
  {
    header: "Actions",
    accessorKey: "id",
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
              <Link href={`/admin/accounts/${user.id}`}>View Account</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(user.id);
                toast("User copied to clipboard");
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
