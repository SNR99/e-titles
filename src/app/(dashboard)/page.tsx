import { currentUser } from "@/auth/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const user = await currentUser();
  return (
    <main className="space-y-6 px-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Hi, Welcome back 👋
        </h2>
      </div>
      <Separator />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {user && user.role === "ADMIN" && (
          <>
            <p>Admin</p>
          </>
        )}
        {user && user.role === "APPLICANT" && (
          <>
            <Link href={"/applications"}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Applications
                  </CardTitle>
                  <GalleryVerticalEnd />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold"></div>
                  <p className="text-xs text-muted-foreground">
                    View and manage your applications
                  </p>
                </CardContent>
              </Card>
            </Link>
          </>
        )}
        {user && user.role === "SUPER_ADMIN" && (
          <>
            <p>Super Admin</p>
          </>
        )}
      </div>
    </main>
  );
}
