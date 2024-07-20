import { Member } from "@/lib/schemas";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import React from "react";
import { cn } from "@/lib/utils";

export default function MemberAvatar({
  member,
  size = "sm",
}: {
  member: Member;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Avatar
      className={cn(
        size === "sm" ? "w-8 h-8 text-base" : "",
        size === "md" ? "w-12 h-12 text-lg" : "",
        size === "lg" ? "w-16 h-16 text-2xl" : "",
      )}
    >
      {!!member.imageUrl?.length ? (
        <Image
          src={member.imageUrl as string}
          alt="Avatar"
          width={44}
          height={44}
          className={cn(`!w-full object-cover`)}
        />
      ) : (
        <AvatarFallback>
          {member.firstName[0]} {member.lastName?.[0] || ""}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
