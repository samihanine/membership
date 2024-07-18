"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { logOut } from "@/server/auth";
import { useAction } from "next-safe-action/hooks";

export default function UserDropdown({
  email,
  imageUrl,
  name,
}: {
  email: string;
  name: string;
  imageUrl?: string;
}) {
  const [openPopover, setOpenPopover] = useState(false);
  const { executeAsync, status } = useAction(logOut);

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div
            onClick={() => setOpenPopover(!openPopover)}
            className="flex items-center gap-3 font-medium hover:cursor-pointer text-muted-foreground hover:text-foreground"
          >
            <Avatar className="h-10 w-10 text-xl">
              {imageUrl?.length && <img src={imageUrl} alt={email} />}

              {!imageUrl?.length && <AvatarFallback>{name[0]}</AvatarFallback>}
            </Avatar>
            <p className="capitalize">{name}</p>
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col items-center gap-4">
          <p className="text-sm font-medium text-muted-foreground">{email}</p>
          <Button
            variant={"destructive"}
            disabled={status === "executing"}
            onClick={() => {
              executeAsync();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <p className="text-sm">Se déconnecter</p>
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
