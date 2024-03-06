"use client";

import { verifyEmail } from "@/actions/auth/verify-email";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export default function VerifyEmailForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const router = useRouter();

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token");
      return;
    }

    verifyEmail(email, token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          setTimeout(() => {
            router.push(`/sign-in?email=${email}`);
          }, 3000);
        }
      })
      .catch(() => {
        setError("Failed to verify email");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div>
      {!success && !error && <BeatLoader />}
      <FormSuccess message={success} />
      {!success && <FormError message={error} />}
    </div>
  );
}
