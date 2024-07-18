"use client";

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { organizationId: string };
}) {
  const pathname = usePathname();

  const links = [
    {
      href: `/organizations/${params.organizationId}/settings`,
      label: "Organisation",
    },
    {
      href: `/organizations/${params.organizationId}/settings/visual`,
      label: "Visuel des cartes",
    },
    {
      href: `/organizations/${params.organizationId}/settings/billing`,
      label: "Facturation",
    },
    {
      href: `/organizations/${params.organizationId}/settings/commands`,
      label: "Historique des commandes",
    },
    {
      href: `/organizations/${params.organizationId}/settings/users`,
      label: "Utilisateurs",
    },
  ];

  return (
    <>
      <div className="flex gap-12 flex-col md:flex-row w-full">
        <nav
          className="flex flex-col gap-2 sm:w-1/5"
          x-chunk="dashboard-04-chunk-0"
        >
          {links.map(({ href, label }) => (
            <Link key={href} href={href}>
              <div
                className={cn(
                  "w-full text-sm whitespace-nowrap text-foreground font-bold hover:underline rounded-md p-2",
                  pathname === href
                    ? "bg-muted-foreground/15 hover:!no-underline"
                    : "",
                )}
              >
                {label}
              </div>
            </Link>
          ))}
        </nav>
        <Card className="flex-1 pt-5">
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </>
  );
}
