"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Organization, updateOrganization } from "@/server/organization";
import { EditIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React, { useState } from "react";
import UploadImageInput from "../upload/upload-image-input";
import { CARD_HEIGHT, CARD_WIDTH } from "@/lib/contants";
import Image from "next/image";
import { showError } from "@/lib/utils";

export default function EditVisualButton({
  children,
  visualType,
  organization,
}: {
  children?: React.ReactNode;
  visualType: "FRONT" | "BACK";
  organization: Organization;
}) {
  const [open, setOpen] = useState(false);
  const [imageCardFrontUrl, setImageCardFrontUrl] = useState(
    organization.imageCardFrontUrl,
  );
  const [imageCardBackUrl, setImageCardBackUrl] = useState(
    organization.imageCardBackUrl,
  );
  const { executeAsync, status } = useAction(updateOrganization);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await executeAsync({
      id: organization.id,
      imageCardFrontUrl: imageCardFrontUrl || undefined,
      imageCardBackUrl: imageCardBackUrl || undefined,
    });

    if (result?.data?.id) {
      setOpen(false);
    } else {
      showError({
        message: "Une erreur s'est produite lors de la mise à jour de l'image.",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children ?? (
          <Button className="gap-1">
            <EditIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Modifier
            </span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modifier le visuel</SheetTitle>
          <SheetDescription>
            {visualType === "FRONT"
              ? "Modifier le visuel du recto de la carte"
              : "Modifier le visuel du verso de la carte"}
          </SheetDescription>
          <div className="h-2" />
          <Image
            className="w-full h-auto border border-border"
            src={
              visualType === "FRONT"
                ? imageCardFrontUrl ?? "/images/visual/front.png"
                : imageCardBackUrl ?? "/images/visual/back.png"
            }
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            alt="Carte recto"
          />
          <div className="h-2" />
          <form onSubmit={onSubmit} className="space-y-8">
            <UploadImageInput
              setImageUrl={(url) => {
                if (visualType === "FRONT") {
                  setImageCardFrontUrl(url);
                } else {
                  setImageCardBackUrl(url);
                }
              }}
              folder={"CARD_IMAGES"}
            />

            <Button
              type="submit"
              className="!w-full"
              disabled={status === "executing"}
            >
              {status !== "executing" ? "Mettre à jour" : "Chargement..."}
            </Button>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
