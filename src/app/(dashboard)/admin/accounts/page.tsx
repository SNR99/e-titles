import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import BreadCrumb from "@/components/breadCrumbs";

import { db } from "@/lib/db";
import { DataTable } from "@/components/tables/data-table";
import { columns } from "@/components/tables/accounts/columns";

const breadcrumbItems = [{ title: "Accounts", link: "/dashboard/accounts" }];

export default function Page() {
  return (
    <div className="space-y-6 p-6">
      <BreadCrumb items={breadcrumbItems} />
      <div className=" flex items-start justify-between">
        <Heading title={`Accounts`} description={"Manage user accounts"} />
        <Link
          href={"/admin/accounts/new"}
          className="flex items-center rounded-lg bg-black px-4 py-3 text-xs text-white md:text-sm"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link>
      </div>
      <Separator />
      <Accounts />
    </div>
  );
}

const Accounts = async () => {
  const users = await db.user.findMany({
    include: {
      organization: true,
    },
  });

  return <DataTable columns={columns} data={users} />;
};
