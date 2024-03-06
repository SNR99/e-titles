import { Metadata } from "next";
import ApplicationForm from "./ApplicationForm";
import { currentUser } from "@/auth/user";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply for a loan",
};

export default async function Page() {
  const user = await currentUser();
  return (
    <ApplicationForm
      user={{
        email: user?.email ?? "",
        name: user?.name ?? "",
        surname: user?.surname ?? "",
      }}
    />
  );
}
