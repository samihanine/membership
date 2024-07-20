"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { OrganizationUser } from "@/lib/schemas";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import React from "react";

export default function DeleteOrganizationUserButton({
  children,
  organizationUser,
}: {
  children?: React.ReactNode;
  organizationUser: OrganizationUser;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children ?? (
          <Button className="gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Retirer un utilisateur
            </span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Retirer un utilisateur</SheetTitle>
          <SheetDescription>
            Retirer l&apos;accès à l&apos;un utilisateur{" "}
            {organizationUser.user.email} à votre organisation
          </SheetDescription>
          <div className="h-2" />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
