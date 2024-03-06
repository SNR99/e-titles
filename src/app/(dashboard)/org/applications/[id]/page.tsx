import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getApplicationById } from "@/lib/queries";
import ApplicationReviewForm, {
	ApplicationReviewFormProps,
} from "@/components/forms/ApplicationReviewForm";

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

	const data: ApplicationReviewFormProps = {
		status: application?.status || "PENDING",
		id: application?.id || "",
		property: {
			address: application?.property?.address || "",
			type: application?.property?.type || "",
			value: application?.property?.value || 0,
			currency: application?.property?.currency || "",
			financingInstitution:
				application?.property?.financingInstitution || "",
		},
		applicant: {
			name: application?.applicant?.name || "",
			surname: application?.applicant?.surname || "",
			email: application?.applicant?.email || "",
			identityType: application?.applicant?.identityType || "PASSPORT",
			identificationNumber:
				application?.applicant?.identificationNumber || "",
		},
	};

	return <ApplicationReviewForm data={data} />;
};
