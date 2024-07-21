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
      href: `/organizations/${params.organizationId}/settings/transactions`,
      label: "Commandes",
    },
    {
      href: `/organizations/${params.organizationId}/settings/billing`,
      label: "Moyens de paiement",
    },
    {
      href: `/organizations/${params.organizationId}/settings/users`,
      label: "Utilisateurs",
    },
  ];

  return (
    <>
      <div className="flex items-center flex-wrap gap-5 justify-between w-full">
        <div className="flex flex-col gap-2">
          <CardTitle>Paramètres</CardTitle>
          <CardDescription>
            Configurer les paramètres de votre organisation
          </CardDescription>
        </div>
      </div>
      <div className="flex gap-8 flex-col w-full">
        <nav className="flex" x-chunk="dashboard-04-chunk-0"></nav>
        <Card className="flex-1 !p-0">
          <CardHeader className="flex flex-col lg:!flex-row lg:items-end border-b border-border lg:!pt-3 lg:!pb-0">
            {links.map(({ href, label }) => (
              <Link key={href} href={href}>
                <div
                  className={cn(
                    "w-full text-sm lg:border-b-2 border-transparent whitespace-nowrap relative pb-2 text-muted-foreground hover:text-primary font-bold px-4 py-3",
                    pathname === href ? "border-primary text-primary" : "",
                  )}
                >
                  {label}
                </div>
              </Link>
            ))}
          </CardHeader>
          <CardContent className="pt-8">{children}</CardContent>
        </Card>
      </div>
    </>
  );
}
