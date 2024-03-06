import VerifyEmailForm from "@/components/forms/auth/verifyEmailForm";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";

export const metadata = {
  title: "Verify Email",
  description: "Confirm your email address",
};

export default function Page() {
  return (
    <main className="flex  h-[100dvh] items-center  justify-center text-center">
      <div className=" w-full max-w-xl space-y-6">
        <Heading title="Confirming your verification" description="" />
        <Separator />
        <VerifyEmailForm />
      </div>
    </main>
  );
}
