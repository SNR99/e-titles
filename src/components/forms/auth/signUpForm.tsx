"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignUpSchema, SignUpType } from "@/lib/schemaValidator";
import { useState, useTransition } from "react";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import Loader from "@/components/Loader";
import { signUpHandler } from "@/actions/auth/sign-up";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
	const form = useForm<SignUpType>({
		resolver: zodResolver(SignUpSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			surname: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const router = useRouter();

	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const onSubmit = (data: SignUpType) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			signUpHandler(data).then((result) => {
				setError(result?.error);
				setSuccess(result?.success);

				if (result?.success) {
					setTimeout(() => {
						router.push(`/sign-in`);
					}, 3000);
				}
			});
		});
	};

	return (
		<>
			<Loader loading={pending} />
			<FormError message={error} />
			<FormSuccess message={success} />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<div className="grid space-y-4 md:grid-cols-2  md:gap-4 md:space-y-0 ">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name*</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="surname"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last Name*</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email*</FormLabel>
									<FormControl>
										<Input {...field} type="email" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password*</FormLabel>
									<FormControl>
										<Input {...field} type="password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{PasswordRequirements()}
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password*</FormLabel>
									<FormControl>
										<Input {...field} type="password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							disabled={pending}
							className="w-full bg-black hover:bg-black/80"
							type="submit"
						>
							Sign up
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
}

const PasswordRequirements = () => {
	return (
		<div className="space-y-2 ">
			<h2 className="text-sm font-semibold">Password Requirements</h2>
			<ul className="list-inside list-disc text-pretty pl-4 text-xs text-gray-500">
				<li>At least 8 characters</li>
				<li>At least one uppercase letter</li>
				<li>At least one lowercase letter</li>
				<li>At least one number</li>
				<li>At least one special character</li>
			</ul>
		</div>
	);
};
