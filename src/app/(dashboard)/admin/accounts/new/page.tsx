import BreadCrumb from "@/components/breadCrumbs";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import AccountForm from "@/components/forms/accounts/accountForm";

const breadcrumbItems = [
  { title: "Accounts", link: "/admin/accounts" },
  { title: "New", link: "/admin/accounts/new" },
];

export default function Page() {
  return (
    <div className="space-y-6 p-6">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-start justify-between">
        <Heading title="Create a user account" />
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
