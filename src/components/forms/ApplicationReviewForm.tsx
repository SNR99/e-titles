"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { Button } from "../ui/button";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import Loader from "../Loader";
import { applicationOutComeHandler } from "@/actions/applicant/application-decision";
import FormError from "../form-error";
import FormSuccess from "../form-success";

export interface ApplicationReviewFormProps {
	status: "PENDING" | "APPROVED" | "REJECTED";
	id: string;
	property: {
		address: string;
		type: string;
		value: number;
		currency: string;
		financingInstitution: string;
	};
	applicant: {
		name: string;
		surname: string;
		email: string;
		identityType: "NATIONAL_ID" | "PASSPORT";
		identificationNumber: string;
	};
}

export default function ApplicationReviewForm({
	data: { status, id, property, applicant },
}: {
	data: ApplicationReviewFormProps;
}) {
	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const decisionHandler = (
		id: string,
		email: string,
		outcome: "reject" | "accept"
	) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			applicationOutComeHandler(id, email, outcome).then((result) => {
				setError(result.error);
				setSuccess(result.success);
			});
		});
	};

	return (
		<>
			<Loader loading={pending} />
			<FormError message={error} />
			<FormSuccess message={success} />
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
								? "RSA ID Number"
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
							{`${formatCurrency(property.value, property.currency)}`}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Financing Institution</TableCell>
						<TableCell> {property.financingInstitution}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Application Status</TableCell>
						<TableCell> {status}</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			{status === "PENDING" && (
				<div className="mt-20 flex justify-end gap-1">
					<Dialog>
						<DialogTrigger>
							<Button variant="destructive">Reject</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									Are you absolutely sure?
								</DialogTitle>
								<DialogDescription>
									I have reviewed the application and I am
									sure I want to reject the application.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter className="sm:justify-start">
								<DialogClose asChild>
									<Button
										type="button"
										variant="destructive"
										onClick={() =>
											decisionHandler(
												id,
												applicant.email,
												"reject"
											)
										}
									>
										Reject
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
					<Dialog>
						<DialogTrigger>
							<Button
								className="bg-green-600 hover:bg-green-500"
								variant="outline"
							>
								Approve
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									Are you absolutely sure?
								</DialogTitle>
								<DialogDescription>
									I have reviewed the application and I am
									sure I want to approve the application.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter className="sm:justify-start">
								<DialogClose asChild>
									<Button
										type="button"
										className="bg-green-600 hover:bg-green-500"
										variant="outline"
										onClick={() =>
											decisionHandler(
												id,
												applicant.email,
												"accept"
											)
										}
									>
										Approve
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			)}
		</>
	);
}
