import { Button } from "@/components/ui/button";
import { useFormContext } from "@/context/FormContext";
import { useState, useTransition } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { newApplication } from "@/actions/applicant/new-application";
import { formatCurrency } from "@/lib/utils";

export default function SummaryPage({ onBack }: any) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [pending, startTransition] = useTransition();

  const {
    state: { applicantDetails: applicant, propertyApplication: property },
  } = useFormContext();

  const router = useRouter();

  const onSubmit = () => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newApplication(applicant, property).then((res) => {
        setError(res.error);
        setSuccess(res.success);

        if (res.success) {
          setTimeout(() => {
            router.push(`/applications/${res.success}`);
          }, 3000);
        }
      });
    });
  };

  return (
    <div className="space-y-6">
      <FormSuccess message={success && "Application has been submitted"} />
      <FormError message={error} />
      <Loader loading={pending} />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-xl font-bold">
              Applicant Details
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell> {applicant.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Last Name</TableCell>
            <TableCell> {applicant.surname}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Email Address</TableCell>
            <TableCell> {applicant.email}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {applicant.identityType === "NATIONAL_ID"
                ? "RSA National ID Number"
                : "Passport Number"}
            </TableCell>
            <TableCell> {applicant.identificationNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-xl font-bold">
              Property Details
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Property Address</TableCell>
            <TableCell>{property.address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Property Type</TableCell>
            <TableCell> {property.type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Value</TableCell>
            <TableCell>
              {formatCurrency(property.value, property.currency)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Financing Institution</TableCell>
            <TableCell> {property.financingInstitution}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="my-6 flex justify-end gap-2">
        <Button
          type="button"
          className="text:gray-800 w-28 border border-gray-800 bg-transparent text-gray-800 hover:border-gray-800 hover:bg-transparent hover:text-gray-800"
          onClick={onBack}
          disabled={!!success || pending}
        >
          Back
        </Button>
        <Button
          className="w-28"
          type="button"
          disabled={!!success || pending}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
