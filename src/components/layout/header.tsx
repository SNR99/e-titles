import Link from "next/link";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-nav";
import UserButton from "@/components/user-button";

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 bg-background/95 fixed left-0 right-0 top-0 z-20 border-b backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link
            href={"/dashboard/"}
            target="_blank "
            className="flex text-lg font-bold"
          >
            BE Sandbox
          </Link>
        </div>

        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>
        <div className="lg:!hidden">
          <Link href={"/dashboard/"} className="flex text-lg font-bold">
            BE Sandbox
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/notifications">
            <Bell />
          </Link>
          <UserButton />
        </div>
      </nav>
    </div>
  );
}
