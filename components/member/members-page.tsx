"use client";

import AddMemberButton from "@/components/member/add-member-button";
import MemberTable from "@/components/member/member-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Member } from "@/lib/schemas";
import { CreditCardIcon, File } from "lucide-react";
import { useState } from "react";
import SubscribeMemberButton from "./subscribe-members-button";
import { displayError } from "@/lib/error";

export default function MembersPage({
  organizationId,
  members,
}: {
  organizationId: string;
  members: Member[];
}) {
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  return (
    <div className="grid flex-1 items-start gap-8">
      <div className="flex items-center flex-wrap gap-5 justify-between w-full">
        <div className="flex flex-col gap-2">
          <CardTitle>Membres</CardTitle>
          <CardDescription>
            Gérer les membres de votre organisation
          </CardDescription>
        </div>

        <div className="ml-auto flex items-center gap-4">
          {selectedMembers.length > 0 ? (
            <SubscribeMemberButton members={selectedMembers}>
              <Button variant={"outline"}>
                <CreditCardIcon className="h-3.5 w-3.5 mr-2" />
                Commandez les cartes
              </Button>
            </SubscribeMemberButton>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                displayError({
                  message:
                    "Veuillez d'abord sélectionner des membres pour les abonner",
                });
              }}
            >
              <CreditCardIcon className="h-3.5 w-3.5 mr-2" />
              Commandez les cartes
            </Button>
          )}

          <Button variant="outline" className="gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Importer
            </span>
          </Button>

          <AddMemberButton />
        </div>
      </div>

      <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
        <CardFooter></CardFooter>
        <CardContent>
          {!members.length && (
            <div
              className="flex py-20 flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold tracking-tight mb-1">
                  Vous n&apos;avez pas encore de membres
                </h3>
                <p className="text-sm text-muted-foreground mb-7">
                  Ajoutez des membres en cliquant sur le bouton ci-dessous
                </p>
                <AddMemberButton />
              </div>
            </div>
          )}
          {!!members.length && (
            <MemberTable
              members={members}
              selectedMembers={selectedMembers}
              setSelectedMembers={setSelectedMembers}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
