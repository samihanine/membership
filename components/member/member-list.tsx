import { Member } from "@/lib/schemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
import React from "react";

export default function MemberList({ members }: { members: Member[] }) {
  const memberCreatedThisMonth = members.filter(
    (member) =>
      new Date(member.createdAt).getMonth() === new Date().getMonth() &&
      new Date(member.createdAt).getFullYear() === new Date().getFullYear(),
  );

  return (
    <Card className="h-full overflow-y-auto">
      <CardHeader>
        <CardTitle>
          <span className="text-xl">Membres Récent</span>
        </CardTitle>
        <CardDescription>
          Vous avez {memberCreatedThisMonth.length} nouveaux membres ce mois-ci.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {memberCreatedThisMonth
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 5)
          .map((member, index) => (
            <React.Fragment key={member.id}>
              {index !== 0 && (
                <div className="border-t border-border w-full"></div>
              )}

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
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
                  </Avatar>{" "}
                  <div>
                    <div>
                      {member.firstName} {member.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {member.email}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {new Date(member.createdAt).toLocaleDateString()}
                </p>
              </div>
            </React.Fragment>
          ))}
      </CardContent>
    </Card>
  );
}
