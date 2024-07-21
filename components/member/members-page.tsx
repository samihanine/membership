"use client";

import AddMemberButton from "@/components/member/add-member-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Member, Organization, PaymentMethod } from "@/lib/schemas";
import { CreditCardIcon, File } from "lucide-react";
import { useState } from "react";
import CreateCardButton from "./create-card-button";
import { showError } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import DeleteMemberButton from "./delete-member-button";
import EditMemberButton from "./edit-member-button";

export default function MembersPage({
  organization,
  members,
  paymentMethods,
}: {
  organization: Organization;
  members: Member[];
  paymentMethods: PaymentMethod[];
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
            <CreateCardButton
              members={selectedMembers}
              organization={organization}
              paymentMethods={paymentMethods}
            >
              <Button variant={"outline"}>
                <CreditCardIcon className="h-3.5 w-3.5 mr-2" />
                Commandez {selectedMembers.length} carte(s)
              </Button>
            </CreateCardButton>
          ) : (
            <div
              onClick={() => {
                showError({
                  message:
                    "Veuillez d'abord sélectionner des membres pour leur commander des cartes.",
                });
              }}
            >
              <Button variant="outline" disabled={true}>
                <CreditCardIcon className="h-3.5 w-3.5 mr-2" />
                Commandez les cartes
              </Button>
            </div>
          )}

          <Button variant="outline" className="gap-1 hidden">
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Checkbox
                      checked={selectedMembers.length > 0}
                      onClick={() => {
                        if (selectedMembers.length === 0) {
                          setSelectedMembers([
                            ...members.filter((m) => !m.cards?.length),
                          ]);
                        } else {
                          setSelectedMembers([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead className="w-[100px]">Photo</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Phone number
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Date d&apos;ajout
                  </TableHead>

                  <TableHead>Carte de membre</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members
                  .sort(
                    (a, b) =>
                      new Date(b.updatedAt).getTime() -
                      new Date(a.updatedAt).getTime(),
                  )
                  .map((member) => (
                    <TableRow
                      key={member.id}
                      className={
                        selectedMembers.includes(member) ? "!bg-primary/20" : ""
                      }
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedMembers.includes(member)}
                          disabled={(member.cards?.length || 0) > 0}
                          onClick={() => {
                            if ((member.cards?.length || 0) > 0) return;

                            if (selectedMembers.includes(member)) {
                              setSelectedMembers(
                                selectedMembers.filter((m) => m !== member),
                              );
                            } else {
                              setSelectedMembers([...selectedMembers, member]);
                            }
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Avatar className="w-11 h-11 text-base">
                          {!!member.imageUrl?.length ? (
                            <Image
                              src={member.imageUrl as string}
                              alt="Avatar"
                              width={44}
                              height={44}
                              className="!w-full object-cover"
                            />
                          ) : (
                            <AvatarFallback>
                              {member.firstName[0]} {member.lastName?.[0] || ""}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">
                        {member.firstName}
                      </TableCell>
                      <TableCell>{member.lastName}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {member.email?.length ? member.email : ""}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {member.phoneNumber?.length ? member.phoneNumber : ""}
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        <Badge variant={"outline"}>
                          {new Date(member.createdAt).toLocaleDateString()}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        {!!member.cards?.length && (
                          <>
                            {member.cards[0].status === "SUCCEEDED" && (
                              <Badge variant="green">à une carte</Badge>
                            )}
                            {member.cards[0].status === "PENDING" && (
                              <Badge variant="warning">
                                En cours de livraison
                              </Badge>
                            )}
                            {member.cards[0].status === "FAILED" && (
                              <Badge variant="destructive">Echec</Badge>
                            )}
                          </>
                        )}
                        {!member.cards?.length && (
                          <CreateCardButton
                            members={[member]}
                            organization={organization}
                            paymentMethods={paymentMethods}
                          >
                            <Button variant="outline" size="sm">
                              Commander
                            </Button>
                          </CreateCardButton>
                        )}
                      </TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="flex flex-col justify-start"
                            align="end"
                          >
                            <EditMemberButton member={member}>
                              <DropdownMenuLabel>Editer</DropdownMenuLabel>
                            </EditMemberButton>

                            <DeleteMemberButton member={member}>
                              <DropdownMenuLabel>Supprimer</DropdownMenuLabel>
                            </DeleteMemberButton>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
