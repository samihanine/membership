"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Member } from "@/lib/schemas";
import { useState } from "react";
import { MemberForm } from "./member-form";

export default function EditMemberButton({
  children,
  member,
}: {
  children: React.ReactNode;
  member: Member;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modifier un membre</SheetTitle>
          <SheetDescription>
            Modifier les informations du membre.
          </SheetDescription>
          <div className="h-2" />
          <MemberForm
            member={member}
            onSuccess={() => {
              setOpen(false);
            }}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
