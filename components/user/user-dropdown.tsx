"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/lib/schemas";
import { logOut } from "@/server/auth";
import { LogOut } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import EditUserButton from "./edit-user-button";

export default function UserDropdown({ user }: { user: User }) {
  const [openPopover, setOpenPopover] = useState(false);
  const { executeAsync, status } = useAction(logOut);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div
            onClick={() => setOpenPopover(!openPopover)}
            className="flex items-center gap-3 font-medium hover:cursor-pointer text-muted-foreground hover:text-foreground"
          >
            <Avatar className="h-10 w-10 text-xl">
              {user.imageUrl?.length && (
                <img src={user.imageUrl} alt={user.email} />
              )}

              {!user.imageUrl?.length && (
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              )}
            </Avatar>
            <p className="capitalize">{user.name}</p>
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col items-center gap-4">
          <EditUserButton user={user} />
          <Button
            variant={"outline"}
            disabled={status === "executing"}
            className="w-full"
            onClick={() => {
              executeAsync();
            }}
          >
            <LogOut className="mr-2 h-4 w-4 text-red-500" />
            <p className="text-sm">Se déconnecter</p>
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
