"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "./ui/separator";
import { Cog, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user-current-user";

import { signOut } from "next-auth/react";

export default function UserButton() {
  const currentUser = useCurrentUser();
  return (
    <HoverCard>
      <HoverCardTrigger>
        <User />
      </HoverCardTrigger>
      <HoverCardContent className="space-y-2">
        <div className="">
          <p className="text-sm font-semibold">
            {currentUser?.name} {currentUser?.surname}
          </p>
          <p className="to-gray-500 text-xs">{currentUser?.email}</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <div className="">
            <Link className="flex items-center gap-x-1" href={"/profile"}>
              <Cog />
              <span className="text-xs text-gray-500">Manage Account</span>
            </Link>
          </div>
          <button onClick={() => signOut()} className="">
            <LogOut size={20} />
          </button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
