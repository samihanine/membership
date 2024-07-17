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
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import React from "react";

export default function AddOrganizationUserButton({
  children,
}: {
  children?: React.ReactNode;
  organizationId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
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
            Retirer l&apos;accès d&apos;un utilisateur à votre organisation
          </SheetDescription>
          <div className="h-2" />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
