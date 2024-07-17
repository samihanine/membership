import { getCurrentUser } from "@/server/user";
import { notFound, redirect } from "next/navigation";
import * as React from "react";
import { getOrganization } from "@/server/organization";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { CARD_HEIGHT, CARD_WIDTH } from "@/lib/contants";
import { Button } from "@/components/ui/button";
import EditVisualButton from "@/components/organization/edit-visual-button";
import { DownloadIcon } from "@radix-ui/react-icons";
import { Organization } from "@/lib/schemas";

export default async function Page({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const organization = await getOrganization({ id: organizationId });

  if (!organization?.data) {
    return notFound();
  }

  const cards: {
    title: string;
    description: string;
    imageUrl: string;
    visualType: "FRONT" | "BACK";
  }[] = [
    {
      title: "Carte recto",
      description: "Personnalisez la carte recto de votre organisation",
      imageUrl:
        organization.data?.imageCardFrontUrl || "/images/visual/front.png",
      visualType: "FRONT",
    },
    {
      title: "Carte verso",
      description: "Personnalisez la carte verso de votre organisation",
      imageUrl:
        organization.data?.imageCardBackUrl || "/images/visual/back.png",
      visualType: "BACK",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2">
        <CardTitle>Vos visuels</CardTitle>
        <CardDescription>
          Personnalisez les visuels de votre organisation
        </CardDescription>
      </div>

      <div className="flex w-full max-w-5xl items-center justify-evenly mx-auto flex-wrap gap-5">
        {cards.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={card.imageUrl}
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                alt={card.title}
                className="border border-border"
              />
            </CardContent>
            <CardFooter className="flex gap-3 justify-center">
              <EditVisualButton
                visualType={card.visualType}
                organization={organization.data as Organization}
              />
              <a href={card.imageUrl} download>
                <Button variant={"outline"}>
                  <DownloadIcon className="h-4 w-4 mr-1" />
                  Télécharger le template
                </Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
