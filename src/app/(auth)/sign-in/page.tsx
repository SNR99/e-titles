import OrSeparator from "@/components/OrSeparator";
import SignInForm from "@/components/forms/auth/signInForm";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const metadata = {
  title: "Sign in",
  description: "Sign in to your account",
};

export default function Page() {
  return (
    <main className="flex h-[100dvh] items-center justify-center">
      <div className="w-full max-w-md justify-center space-y-6 p-6">
        <Heading title="Sign in" />
        <Separator />
        <SignInForm />
        <OrSeparator />
        <Link
          className="block rounded-lg border p-2 text-center text-sm font-semibold transition-colors duration-300 ease-in-out hover:bg-primary-foreground hover:text-black/80"
          href={"/sign-up"}
        >
          Sign up for an account
        </Link>
      </div>
    </main>
  );
}
