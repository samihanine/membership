"use client";

import { Member } from "@/lib/schemas";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
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
import SubscribeMembersButton from "./subscribe-members-button";

export default function MemberTable({
  members,
  selectedMembers,
  setSelectedMembers,
}: {
  members: Member[];
  selectedMembers: Member[];
  setSelectedMembers: (members: Member[]) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              checked={selectedMembers.length > 0}
              onClick={() => {
                if (selectedMembers.length < members.length) {
                  setSelectedMembers([...members]);
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
          <TableHead className="hidden md:table-cell">Phone number</TableHead>
          <TableHead className="hidden md:table-cell">
            Date d&apos;expiration
          </TableHead>

          <TableHead>Commander</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
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
                  onClick={() => {
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
              <TableCell className="font-medium">{member.firstName}</TableCell>
              <TableCell>{member.lastName}</TableCell>
              <TableCell className="hidden md:table-cell">
                {member.email?.length ? member.email : "N/A"}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {member.phoneNumber?.length ? member.phoneNumber : "N/A"}
              </TableCell>

              <TableCell className="hidden md:table-cell">
                <Badge
                  variant={member.membershipExpiresAt ? "green" : "outline"}
                >
                  {member.membershipExpiresAt
                    ? new Date(member.membershipExpiresAt).toLocaleDateString()
                    : "N/A"}
                </Badge>
              </TableCell>

              <TableCell className="hidden md:table-cell">
                {!!member.commands?.length && (
                  <>
                    {member.commands[0].status === "SUCCEEDED" && (
                      <Badge variant="green">Succès</Badge>
                    )}
                    {member.commands[0].status === "PENDING" && (
                      <Badge variant="outline">En cours de livraison</Badge>
                    )}
                    {member.commands[0].status === "FAILED" && (
                      <Badge variant="destructive">Echec</Badge>
                    )}
                  </>
                )}
                {!member.commands?.length && (
                  <SubscribeMembersButton members={[member]}>
                    <Button variant="outline" size="sm">
                      Commander
                    </Button>
                  </SubscribeMembersButton>
                )}
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
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
  );
}
