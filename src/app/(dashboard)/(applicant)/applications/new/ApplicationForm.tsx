"use client";

import { useState } from "react";
import ApplicantForm from "@/components/forms/applicant/applicantForm";
import PropertyForm from "@/components/forms/applicant/propertyForm";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import SummaryPage from "./SummaryPage";

export default function ApplicationForm({
  user,
}: {
  user: {
    name: string;
    surname: string;
    email: string;
  };
}) {
  const [step, setStep] = useState(1);

  const onNext = () => {
    setStep(step + 1);
  };

  const onBack = () => {
    setStep(step - 1);
  };

  return (
    <main className="h-full space-y-6 p-4 ">
      <Heading
        title={headings[step].title}
        description={headings[step].description}
      />
      <Separator />
      {step === 1 && (
        <ApplicantForm
          onNext={onNext}
          user={{
            name: user.name,
            email: user.email,
            surname: user.surname,
          }}
        />
      )}
      {step === 2 && <PropertyForm onBack={onBack} onNext={onNext} />}
      {step === 3 && <SummaryPage onBack={onBack} />}
    </main>
  );
}

interface HeadingDetails {
  title: string;
  description: string;
}

const headings: { [key: number]: HeadingDetails } = {
  1: {
    title: "Applicant Details",
    description: "Please provide your personal details",
  },
  2: {
    title: "Property Details",
    description: "Please provide the property details",
  },
  3: {
    title: "Summary",
    description: "Please review the details",
  },
};
