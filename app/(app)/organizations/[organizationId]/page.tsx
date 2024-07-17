import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Member } from "@/lib/schemas";
import { getMembers } from "@/server/member";
import { getCurrentUser } from "@/server/user";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CreditCardIcon, ShieldCheck, ShieldX, UserIcon } from "lucide-react";
import MemberChart from "@/components/member/member-chart";
import MemberList from "@/components/member/member-list";

export default async function Page({
  params,
}: {
  params: { organizationId: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const result = await getMembers({ organizationId: params.organizationId });

  const members = (result?.data as Member[]) || [];

  const stats = [
    {
      title: "Total de membres",
      value: members.length.toString(),
      Icon: UserIcon as any,
    },
    {
      title: "Membres abonnés",
      value: members
        .filter(
          (member) =>
            new Date(member.membershipExpiresAt || new Date(1970)) > new Date(),
        )
        .length.toString(),
      Icon: ShieldCheck as any,
    },
    {
      title: "Membres non abonnés",
      value: members
        .filter(
          (member) =>
            new Date(member.membershipExpiresAt || new Date(1970)) < new Date(),
        )
        .length.toString(),
      Icon: ShieldX as any,
    },
    {
      title: "Nombre de cartes commandées",
      value: "0",
      Icon: CreditCardIcon as any,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center flex-wrap gap-5 justify-between w-full">
        <div className="flex flex-col gap-2">
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            Vue d&apos;ensemble des vos membres et vos commandes
          </CardDescription>
        </div>

        <Link href={`/organizations/${params.organizationId}/members`}>
          <Button>
            <EyeIcon className="h-3.5 w-3.5 mr-2" />
            Gérer les membres
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex justify-between !flex-row gap-4 items-center !pb-3">
                <CardDescription>{stat.title}</CardDescription>
                <stat.Icon className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <h2 className="text-3xl font-semibold">{stat.value}</h2>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-4 flex-col md:flex-row">
          <div className="md:flex-[2]">
            <MemberChart members={members} />
          </div>

          <div className="md:flex-[1]">
            <MemberList members={members} />
          </div>
        </div>
      </div>
    </div>
  );
}
