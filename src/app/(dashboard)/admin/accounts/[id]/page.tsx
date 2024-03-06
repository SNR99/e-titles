import BreadCrumb from "@/components/breadCrumbs";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { db } from "@/lib/db";

interface PageProps {
  params: {
    id: string;
  };
}
export default function Page({ params: { id } }: PageProps) {
  const breadcrumbItems = [
    { title: "Accounts", link: "/admin/accounts" },
    { title: "View", link: `/admin/accounts/${id}` },
  ];
  return (
    <main className="space-y-6 px-6">
      <BreadCrumb items={breadcrumbItems} />
      <Heading title="Account" description="View and manage your account" />
      <Separator />
      <Account id={id} />
    </main>
  );
}

const Account = async ({ id }: { id: string }) => {
  const user = await db.user.findFirst({
    where: {
      id,
    },
    include: {
      organization: true,
    },
  });

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Full Name</TableCell>
          <TableCell>
            {user.name} {user.surname}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>{user.email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Role</TableCell>
          <TableCell> {user.role}</TableCell>
        </TableRow>
        {user.organization && (
          <TableRow>
            <TableCell>Organization</TableCell>
            <TableCell>{user.organization.name}</TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableCell>Account Verified</TableCell>
          <TableCell>{!!user.emailVerified ? "Yes" : "No"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Account created at</TableCell>
          <TableCell>
            {user.createdAt.toDateString()}{" "}
            {user.createdAt.toLocaleTimeString()}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
