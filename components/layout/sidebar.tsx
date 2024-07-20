"use client";

import SelectOrganization from "@/components/organization/select-organization";
import { Organization, User } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { CogIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoText } from "../ui/logo-text";
import UserDropdown from "../user/user-dropdown";
import ThemeToggle from "./theme-toggle";

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
        <nav className="flex flex-col gap-2">
          <div className="flex items-center gap-2 justify-between border-b border-border px-5 py-3">
            <LogoText />

            <div className="flex items-center gap-3">
              <ThemeToggle />

              {closeSidebar && (
                <button onClick={closeSidebar} aria-label="Fermer le menu">
                  <XIcon
                    className="w-6 h-6 text-foreground cursor-pointer hover:text-primary transition-colors
                  "
                  />
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 px-5 py-3">
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
              <HomeIcon className="h-5 w-5" /> Tableau de bord
            </MenuItem>

            <MenuItem
              href={`/organizations/${organizationId}/members`}
              onClick={closeSidebar}
            >
              <UserCircleIcon className="h-5 w-5" /> Membres
            </MenuItem>

            <MenuItem
              href={`/organizations/${organizationId}/settings`}
              onClick={closeSidebar}
            >
              <CogIcon className="h-5 w-5" /> Paramètres
            </MenuItem>
          </div>
        </nav>

        <div className="flex flex-col gap-2 p-5 border-t border-border">
          <UserDropdown user={user} />
        </div>
      </div>
    </div>
  );
}
