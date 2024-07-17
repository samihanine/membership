import { Member } from "@/lib/schemas";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function MemberList({ members }: { members: Member[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <span className="text-xl">Membres Récent</span>
        </CardTitle>
        <CardDescription>
          Voici les membres les plus récents que vous avez ajoutés
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
