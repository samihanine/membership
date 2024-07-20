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
import React, { useState } from "react";
import { InviteUserForm } from "./invite-user-form";

export default function InviteUserButton({
  children,
  organizationId,
}: {
  children?: React.ReactNode;
  organizationId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children ?? (
          <Button className="gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sm:whitespace-nowrap">Inviter un utilisateur</span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Inviter un utilisateur</SheetTitle>
          <SheetDescription>
            Inviter un utilisateur qui aura accès à votre organisation
          </SheetDescription>
          <div className="h-2" />
          <InviteUserForm
            organizationId={organizationId}
            onSuccess={() => {
              setOpen(false);
            }}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
