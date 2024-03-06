import VerifyForm from "@/components/forms/accounts/verifyForm";
import ActivateAccountForm from "@/components/forms/accounts/verifyForm";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <main className="flex items-center justify-center">
      <div className="mt-20 w-full max-w-md space-y-6 p-6">
        <Heading title="Activate Account" description="" />
        <Separator />
        <VerifyForm />
      </div>
    </main>
  );
}
