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
import { subscribeMembers } from "@/server/member";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

export default function SubscribeMembersButton({
  children,
  members,
}: {
  children: React.ReactNode;
  members: Member[];
}) {
  const [open, setOpen] = useState(false);
  const { executeAsync, status } = useAction(subscribeMembers);
  const params = useParams();

  const handleSubmit = async ({
    subscriptionType,
  }: {
    subscriptionType: "CARD" | "EMAIL";
  }) => {
    await executeAsync({
      memberIds: members.map((member) => member.id),
      subscriptionType: subscriptionType,
      organizationId: params.organizationId as string,
    });
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Commandez des cartes</SheetTitle>
          <SheetDescription>
            Vous pouvez commandez les membres selectionnés à votre organisation,
            en lui envoyant une carte de membre ou en lui envoyant un lien
            d&apos;invitation par email.
          </SheetDescription>

          <p className="font-medium text-sm text-muted-foreground">
            Membres sélectionnés:{" "}
            <span className="text-primary">{members.length}</span>
          </p>
          <div className="h-2" />

          <div className="flex flex-col gap-4">
            <Button
              className="!h-fit"
              onClick={() => handleSubmit({ subscriptionType: "CARD" })}
              disabled={status === "executing"}
            >
              Envoyer à chacun une carte de membre
            </Button>

            <Button
              variant={"outline"}
              className="!h-fit"
              onClick={() => handleSubmit({ subscriptionType: "EMAIL" })}
              disabled={status === "executing"}
            >
              Envoyer à chacun un email
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
