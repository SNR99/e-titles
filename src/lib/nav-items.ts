import { UserRole } from "@prisma/client";
import { NavItem } from "@/lib/types";

export const navItemsMap: Record<UserRole, NavItem[]> = {
  SUPER_ADMIN: [
    {
      title: "Dashboard",
      href: "/",
      icon: "dashboard",
      label: "Dashboard",
    },
    {
      href: "/admin/accounts",
      icon: "users",
      label: "Users",
      title: "Accounts",
    },
    {
      href: "/admin/organizations",
      icon: "building2",
      label: "Organizations",
      title: "Organizations",
    },
  ],
  APPLICANT: [
    {
      title: "Dashboard",
      href: "/",
      icon: "dashboard",
      label: "Dashboard",
    },
    {
      title: "Profile",
      href: "/profile",
      icon: "user",
      label: "Profile",
    },
  ],
  ADMIN: [
    {
      title: "Dashboard",
      href: "/",
      icon: "dashboard",
      label: "Dashboard",
    },
    {
      title: "Applications",
      href: "/org/applications",
      icon: "squarePen",
      label: "Applications",
    },
  ],
};
