import ResetPasswordForm from "@/components/forms/auth/resetPasswordForm";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset password",
};

export default function Page() {
  return (
    <main className="flex h-[100dvh] items-center justify-center">
      <div className="w-full max-w-md justify-center space-y-6 p-6">
        <Heading title="Sign in" />
        <Separator />
        <ResetPasswordForm />
      </div>
    </main>
  );
}
