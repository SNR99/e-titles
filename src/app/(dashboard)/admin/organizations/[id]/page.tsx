import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import BreadCrumb from "@/components/breadCrumbs";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: PageProps) {
  const breadcrumbItems = [
    { title: "Organizations", link: "/admin/organizations" },
    { title: "View", link: `/admin/organizations/${id}` },
  ];
  return (
    <main className="space-y-6 px-6">
      <BreadCrumb items={breadcrumbItems} />

      <Heading
        title="Organization"
        description="View and manage your organization"
      />
      <Separator />
      <Organization id={id} />
    </main>
  );
}

const Organization = async ({ id }: { id: string }) => {
  const organization = await db.organization.findFirst({
    where: {
      id,
    },
  });

  if (!organization) {
    return <p>Organization not found</p>;
  }
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Organization Name</TableCell>
          <TableCell> {organization.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Abbreviated Name</TableCell>
          <TableCell> {organization.abbreviation}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Email Address</TableCell>
          <TableCell> {organization.orgType}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
