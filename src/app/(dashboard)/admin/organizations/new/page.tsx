import BreadCrumb from "@/components/breadCrumbs";
import OrganizationForm from "@/components/forms/organizations/organizationForm";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const breadcrumbItems = [
  { title: "Organizations", link: "/admin/organizations" },
  { title: "New", link: "/admin/organizations/new" },
];

export default function Page() {
  return (
    <div className="space-y-6 p-6">
      <BreadCrumb items={breadcrumbItems} />
      <div className=" flex items-start justify-between">
        <Heading title="Create an organization" description="" />
      </div>
      <Separator />
      <OrganizationForm />
    </div>
  );
}
