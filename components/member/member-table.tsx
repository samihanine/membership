import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Member } from "@/lib/schemas";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import EditMemberButton from "./edit-member-button";
import DeleteMemberButton from "./delete-member-button";
import SubscribeMemberButton from "./subscribe-member-button";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default async function MemberTable({ members }: { members: Member[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Prénom</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="hidden md:table-cell">Phone number</TableHead>
          <TableHead className="hidden md:table-cell">Expire le</TableHead>
          <TableHead className="hidden md:table-cell">Ajouté le</TableHead>
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
            <TableRow key={member.id}>
              <TableCell className="hidden sm:table-cell">
                <Avatar className="w-11 h-11 text-base">
                  {!!member.imageUrl?.length && (
                    <Image
                      src={member.imageUrl as string}
                      alt="Avatar"
                      width={44}
                      height={44}
                    />
                  )}
                  <AvatarFallback>
                    {member.firstName[0]} {member.lastName?.[0] || ""}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{member.firstName}</TableCell>
              <TableCell>{member.lastName}</TableCell>
              <TableCell>
                {member.email?.length ? member.email : "N/A"}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {member.phoneNumber?.length ? member.phoneNumber : "N/A"}
              </TableCell>

              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">
                  {member.membershipExpiresAt
                    ? new Date(member.membershipExpiresAt).toLocaleDateString()
                    : "N/A"}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">
                  {member.createdAt
                    ? new Date(member.createdAt).toLocaleDateString()
                    : "N/A"}
                </Badge>
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

                    <SubscribeMemberButton member={member}>
                      <DropdownMenuLabel>Souscrire</DropdownMenuLabel>
                    </SubscribeMemberButton>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
