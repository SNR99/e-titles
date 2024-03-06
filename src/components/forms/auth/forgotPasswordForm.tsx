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
import {
	ForgotPasswordSchema,
	ForgotPasswordType,
} from "@/lib/schemaValidator";
import { useState, useTransition } from "react";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { forgotPasswordHandler } from "@/actions/auth/forgot-password";
import Loader from "@/components/Loader";

export default function ForgotPasswordForm() {
	const form = useForm<ForgotPasswordType>({
		resolver: zodResolver(ForgotPasswordSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
		},
	});

	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const onSubmit = (data: ForgotPasswordType) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			forgotPasswordHandler(data).then((result) => {
				setError(result?.error);
				setSuccess(result?.success);
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

						<Button
							disabled={pending}
							className="w-full bg-black hover:bg-black/80"
							type="submit"
						>
							Send Reset Link
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
}
