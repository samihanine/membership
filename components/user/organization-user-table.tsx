import { OrganizationUser } from "@/lib/schemas";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
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
import DeleteOrganizationUserButton from "./delete-organization-user-button";

export default async function OrganizationUserTable({
  organizationUsers,
}: {
  organizationUsers: OrganizationUser[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="hidden md:table-cell">Invité le</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizationUsers
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          )
          .map((organizationUser) => (
            <TableRow key={organizationUser.id}>
              <TableCell className="font-medium">
                {organizationUser.user.email}
              </TableCell>
              <TableCell>
                <Badge variant={"outline"}>
                  {organizationUser.role === "ADMINISTRATOR" &&
                    "Administrateur"}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(organizationUser.createdAt).toLocaleDateString()}
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
                    <DeleteOrganizationUserButton
                      organizationUser={organizationUser}
                    >
                      <DropdownMenuLabel>Supprimer</DropdownMenuLabel>
                    </DeleteOrganizationUserButton>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
