"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Member } from "@/lib/schemas";
export default function SubscribeMemberButton({
  children,
  member,
}: {
  children: React.ReactNode;
  member: Member;
}) {
  const [open, setOpen] = useState(false);
  const params = useParams();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Souscrire un membre</SheetTitle>
          <SheetDescription>
            Vous pouvez souscrire un membre à votre organisation, en lui
            envoyant une carte de membre ou en lui envoyant un lien d'invitation
            par email.
          </SheetDescription>
          <div className="h-2" />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
