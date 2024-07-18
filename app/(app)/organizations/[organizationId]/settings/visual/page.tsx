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
    <div className="flex flex-col gap-5">
      <div className="flex items-center">
        <CardTitle className="text-lg text-center">
          Modifier le visuel des cartes
        </CardTitle>
      </div>

      <div className="flex w-full flex-wrap gap-5 sm:gap-12">
        {cards.map((card, index) => (
          <Card key={index} className="!shadow-none">
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={card.imageUrl}
                width={(CARD_WIDTH / CARD_HEIGHT) * 200}
                height={(CARD_HEIGHT / CARD_WIDTH) * 200}
                alt={card.title}
                className="border border-border"
              />
            </CardContent>
            <CardFooter className="flex gap-3 justify-center">
              <a href={card.imageUrl} download>
                <Button variant={"outline"}>
                  <DownloadIcon className="h-4 w-4 mr-1" />
                  Télécharger
                </Button>
              </a>

              <EditVisualButton
                visualType={card.visualType}
                organization={organization.data as Organization}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
