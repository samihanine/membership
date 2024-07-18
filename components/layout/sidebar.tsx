"use client";

import {
  ChartBarIcon,
  CogIcon,
  EnvelopeIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import SelectOrganization from "@/components/organization/select-organization";
import { Organization, User } from "@/lib/schemas";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import UserDropdown from "../user/user-dropdown";
import { LogoText } from "../ui/logo-text";
import { XIcon } from "lucide-react";

const MenuItem: React.FC<{
  children: React.ReactNode;
  href: string;
  exact?: boolean;
  onClick?: () => void;
}> = ({ children, href, exact, onClick }) => {
  const pathname = usePathname();
  const path = pathname.replace(/^\/[a-z]{2}\//, "/");
  const isActive = exact ? path === href : path.includes(href);

  return (
    <Link
      href={href}
      className={`flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-accent hover:text-foreground ${
        isActive
          ? "bg-accent font-medium text-foreground"
          : "text-muted-foreground"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default function Sidebar({
  organizationId,
  organizations,
  className,
  user,
  closeSidebar,
}: {
  organizationId: string;
  organizations: Organization[];
  user: User;
  className?: string;
  closeSidebar?: () => void;
}) {
  return (
    <div
      className={cn(
        "h-full flex-col justify-between border-r border-border bg-card",
        className,
      )}
    >
      <div className="flex flex-grow flex-col justify-between">
        <nav className="flex flex-col gap-2 px-5 py-3">
          <div className="flex items-center gap-2 justify-between">
            <LogoText />

            {closeSidebar && (
              <XIcon
                className="w-6 h-6 text-foreground cursor-pointer"
                onClick={closeSidebar}
              />
            )}
          </div>
          <div className="h-2" />
          <SelectOrganization
            organizations={organizations}
            organizationId={organizationId}
          />
          <div className="h-2" />

          <MenuItem
            exact
            href={`/organizations/${organizationId}`}
            onClick={closeSidebar}
          >
            <HomeIcon className="h-5 w-5" /> Dashboard
          </MenuItem>

          <MenuItem
            href={`/organizations/${organizationId}/members`}
            onClick={closeSidebar}
          >
            <UserCircleIcon className="h-5 w-5" /> Members
          </MenuItem>

          <MenuItem
            href={`/organizations/${organizationId}/settings`}
            onClick={closeSidebar}
          >
            <CogIcon className="h-5 w-5" /> Settings
          </MenuItem>
        </nav>

        <div className="flex flex-col gap-2 p-5">
          <UserDropdown
            name={user.name}
            email={user.email}
            imageUrl={user.imageUrl}
          />
        </div>
      </div>
    </div>
  );
}
