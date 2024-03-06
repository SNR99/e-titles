import ForgotPasswordForm from "@/components/forms/auth/forgotPasswordForm";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Forgot Password",
  description: "Forgot Password",
};

export default function Page() {
  return (
    <main className="flex h-[100dvh] items-center justify-center">
      <div className="w-full max-w-md justify-center space-y-6 p-6">
        <Heading title="Forgot Password" />
        <Separator />
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
