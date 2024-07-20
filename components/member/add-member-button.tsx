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
import { MemberForm } from "./member-form";

export default function AddMemberButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children ?? (
          <Button className="gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Ajouter un membre
            </span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ajouter un membre</SheetTitle>
          <SheetDescription>
            Ajouter un membre à votre organisation.
          </SheetDescription>
          <div className="h-2" />
          <MemberForm
            onSuccess={() => {
              setOpen(false);
            }}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
