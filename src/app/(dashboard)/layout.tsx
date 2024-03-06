import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { SessionProvider } from "next-auth/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormProvider } from "@/context/FormContext";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <FormProvider>
        <Header />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <ScrollArea className="h-full w-full  pt-20">{children}</ScrollArea>
        </div>
      </FormProvider>
    </SessionProvider>
  );
}
