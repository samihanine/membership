import AddMemberButton from "@/components/member/add-member-button";
import MemberTable from "@/components/member/member-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Member } from "@/lib/schemas";
import { getMembers } from "@/server/member";
import { getCurrentUser } from "@/server/user";
import { File } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Members({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const result = await getMembers({ organizationId });

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
          <Button variant="outline" className="gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Exporter
            </span>
          </Button>
          <AddMemberButton />
        </div>
      </div>

      <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-auto">
        <CardFooter></CardFooter>
        <CardContent>
          {!result?.data?.length && (
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
          {!!result?.data?.length && (
            <MemberTable members={result.data as Member[]} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
