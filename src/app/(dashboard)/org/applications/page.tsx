import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

import { DataTable } from "@/components/tables/data-table";
import { columns } from "@/components/tables/review/columns";
export default function Page() {
  return (
    <main className="space-y-6 px-6">
      <Heading
        title="Applications"
        description="View and manage your applications"
      />
      <Separator />
      <Applications />
    </main>
  );
}

const Applications = async () => {
  const applications = await db.application.findMany({
    include: {
      property: true,
      applicant: true,
    },
  });

  return <DataTable columns={columns} data={applications} />;
};
