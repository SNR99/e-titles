import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getApplications } from "@/lib/queries";

import { currentUser } from "@/auth/user";
import { columns } from "@/components/tables/applications/columns";
import { DataTable } from "@/components/tables/data-table";
import BreadCrumb from "@/components/breadCrumbs";
import Link from "next/link";
import { Plus } from "lucide-react";

const breadcrumbItems = [{ title: "Applications", link: "/applications" }];

export default function Page() {
  return (
    <main className="space-y-6 px-6">
      <BreadCrumb items={breadcrumbItems} />
      <div className=" flex items-start justify-between">
        <Heading
          title={`Applications`}
          description={"View and manage your applications"}
        />
        <Link
          href={"/applications/new"}
          className="flex items-center rounded-lg bg-black px-4 py-3 text-xs text-white md:text-sm"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link>
      </div>
      <Separator />
      <Applications />
    </main>
  );
}

const Applications = async () => {
  const user = await currentUser();
  const applications = await getApplications(user?.email ?? "");

  return <DataTable columns={columns} data={applications} />;
};
