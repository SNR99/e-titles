import { currentUser } from "@/auth/user";
import BreadCrumb from "@/components/breadCrumbs";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import Link from "next/link";

import { db } from "@/lib/db";
export default function Page() {
  const breadcrumbItems = [
    { title: "Applications", link: "/org/applications" },
  ];
  return (
    <div className="space-y-6 p-6">
      <BreadCrumb items={breadcrumbItems} />
      <div className=" flex items-start justify-between">
        <Heading title={`Applications`} description={"Manage applications"} />
      </div>
      <Separator />
      <Applications />
    </div>
  );
}

const Applications = async () => {
  const user = await currentUser();
  const applications = await db.application.findMany({
    include: {
      applicant: true,
      property: true,
    },
  });

  if (!applications) {
    return <p>No applications has been added</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Organization</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.id}>
            <TableCell>
              {application.applicant.name} {application.applicant.surname}
            </TableCell>
            <TableCell>{application.property.address}</TableCell>
            <TableCell>
              {application.property.value} {application.property.currency}
            </TableCell>
            <TableCell>{application.property.financingInstitution}</TableCell>
            <TableCell>{application.status}</TableCell>

            <TableCell>
              <Link
                className="font-semibold text-blue-600"
                href={`/org/applications/${application.id}`}
              >
                View
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
