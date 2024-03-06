"use client";

import React, { useState } from "react";
import { createContext } from "react";
import { PropertyType, ApplicantDetailsType } from "@/lib/schemaValidator";
import { useCurrentUser } from "@/hooks/user-current-user";

interface FormContextProps {
  state: StateProps;
  updatePropertyApplication: (propertyApplication: PropertyType) => void;
  updateApplicantDetails: (applicantDetails: ApplicantDetailsType) => void;
}

interface StateProps {
  propertyApplication: PropertyType;
  applicantDetails: ApplicantDetailsType;
}

const initialState: StateProps = {
  propertyApplication: {
    address: "",
    currency: "ZAR",
    financingInstitution: "",
    other: "",
    type: "",
    value: 0,
  },
  applicantDetails: {
    email: "",
    identificationNumber: "",
    identityType: undefined,
    name: "",
    surname: "",
  },
};

export const FormContext = createContext<FormContextProps>({
  state: initialState,
  updatePropertyApplication: () => {},
  updateApplicantDetails: () => {},
});

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser();
  const [state, setState] = useState<StateProps>(initialState);

  const updatePropertyApplication = (propertyApplication: PropertyType) => {
    setState((prev) => ({ ...prev, propertyApplication }));
  };

  const updateApplicantDetails = (applicantDetails: ApplicantDetailsType) => {
    setState((prev) => ({ ...prev, applicantDetails }));
  };

  return (
    <FormContext.Provider
      value={{ state, updateApplicantDetails, updatePropertyApplication }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
