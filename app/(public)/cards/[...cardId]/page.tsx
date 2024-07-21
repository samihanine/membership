import MemberAvatar from "@/components/member/member-avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Member } from "@/lib/schemas";
import { getMemberByCardId } from "@/server/card";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { cardId: string } }) {
  const result = await getMemberByCardId({ cardId: params.cardId });
  console.log(params);
  const member = result?.data as Member;

  if (!member) {
    return notFound();
  }

  return (
    <div className="bg-background p-10 w-full min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-col items-center justify-center">
          <MemberAvatar member={member} size="lg" />
          <CardTitle className="pt-2 capitalize">
            {member.firstName} {member.lastName}
          </CardTitle>

          <div className="border-b border-border w-full mb-6 pt-6" />
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center">
          {member.membershipExpiresAt && (
            <Badge variant={"green"} className="text-sm">
              Membre jusqu&apos;au{" "}
              {new Date(member.membershipExpiresAt).toLocaleDateString(
                "fr-FR",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </Badge>
          )}

          {new Date(member.membershipExpiresAt || "") < new Date() && (
            <Badge variant={"destructive"} className="text-sm">
              Membre non abonné
            </Badge>
          )}

          <p className="text-sm text-center mt-4">{member.email}</p>
        </CardContent>
      </Card>
    </div>
  );
}
