import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getApplicationById } from "@/lib/queries";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: PageProps) {
  return (
    <main className="space-y-6 px-6">
      <Heading
        title="Applications"
        description="View and manage your applications"
      />
      <Separator />
      <Application id={id} />
    </main>
  );
}

const Application = async ({ id }: { id: string }) => {
  const application = await getApplicationById(id);

  if (!application) {
    return <p>Application not found</p>;
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="text-xl font-bold">My Details</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>First Name</TableCell>
          <TableCell> {application.applicant.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Last Name</TableCell>
          <TableCell> {application.applicant.surname}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Email Address</TableCell>
          <TableCell> {application.applicant.email}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            {application.applicant.identityType === "NATIONAL_ID"
              ? "RSA ID Number"
              : "Passport Number"}
          </TableCell>
          <TableCell> {application.applicant.identificationNumber}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-xl font-bold">Property Details</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Property Address</TableCell>
          <TableCell>{application.property.address}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Property Type</TableCell>
          <TableCell> {application.property.type}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Value</TableCell>
          <TableCell>
            {`${formatCurrency(
              application.property.value,
              application.property.currency,
            )}`}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Financing Institution</TableCell>
          <TableCell> {application.property.financingInstitution}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Application Status</TableCell>
          <TableCell> {application.status}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
