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
import { User } from "@/lib/schemas";
import { showSuccess } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import React, { useState } from "react";
import { UserForm } from "./user-form";

export default function EditUserButton({
  children,
  user,
}: {
  children?: React.ReactNode;
  user: User;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children ?? (
          <Button className="gap-1 !w-full">
            <UserIcon className="h-3.5 w-3.5" />
            <span className="sm:whitespace-nowrap">Mon compte</span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-col gap-5">
          <div>
            <SheetTitle>Modifier mon compte</SheetTitle>
            <SheetDescription>
              Modifier les informations de mon compte
            </SheetDescription>
          </div>
          <UserForm
            user={user}
            onSuccess={() => {
              showSuccess({
                message: "Vos informations ont été mises à jour.",
              });
              setOpen(false);
            }}
          />
          <div className="border border-b border-border" />

          <div className="flex flex-col gap-3">
            <Button variant={"outline"}>Changer de mot de passe</Button>
            <Button variant={"destructive"}>Supprimer mon compte</Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
