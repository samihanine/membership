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
import { Member } from "@/lib/schemas";
import { deleteMember } from "@/server/member";
import { PlusCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

export default function DeleteMemberButton({
  children,
  member,
}: {
  children?: React.ReactNode;
  member: Member;
}) {
  const [open, setOpen] = useState(false);
  const { executeAsync, status } = useAction(deleteMember);

  const handleDelete = async () => {
    await executeAsync(member);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        {children ?? (
          <Button className="gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Supprimer le membre
            </span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Supprimer le membre</SheetTitle>
          <SheetDescription>
            Êtes-vous sûr de vouloir supprimer ce membre de votre organisation ?
            Cette action est irréversible.
          </SheetDescription>
          <div className="h-2" />

          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={status === "executing"}
          >
            Supprimer le membre
          </Button>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
