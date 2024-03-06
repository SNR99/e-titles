import OrSeparator from "@/components/OrSeparator";
import SignUpForm from "@/components/forms/auth/signUpForm";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const metadata = {
  title: "Sign Up",
  description: "Sign up for an account",
};

export default function Page() {
  return (
    <main className="flex items-center justify-center">
      <div className="mt-20 w-full max-w-md space-y-6 p-6">
        <Heading title="Sign Up" description="" />
        <Separator />
        <SignUpForm />
        <OrSeparator />
        <Link
          className="block rounded-lg border p-2 text-center text-sm font-semibold transition-colors duration-300 ease-in-out hover:bg-primary-foreground hover:text-black/80"
          href={"/sign-in"}
        >
          Sign in to your account
        </Link>
      </div>
    </main>
  );
}
