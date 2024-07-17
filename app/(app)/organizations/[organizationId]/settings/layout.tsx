"use client";

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

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
      <div className="flex flex-col gap-2 items-center mb-8">
        <CardTitle>Paramètres</CardTitle>
        <CardDescription>
          Gérer et configurer votre organisation
        </CardDescription>
      </div>
      <Card>
        <div className="h-8" />

        <CardContent className="flex gap-12 flex-col md:flex-row">
          <nav
            className="flex flex-col gap-2 sm:w-1/5"
            x-chunk="dashboard-04-chunk-0"
          >
            {links.map(({ href, label }) => (
              <Link key={href} href={href}>
                <div
                  className={cn(
                    "w-full text-sm whitespace-nowrap text-foreground font-bold hover:underline rounded-md p-2",
                    pathname === href ? "bg-muted hover:!no-underline" : "",
                  )}
                >
                  {label}
                </div>
              </Link>
            ))}
          </nav>
          <div className="grid gap-6 flex-1">{children}</div>
        </CardContent>
      </Card>
    </>
  );
}
