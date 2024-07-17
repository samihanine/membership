"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { displayError } from "@/lib/error";
import { organizationSchema } from "@/lib/schemas";
import {
  Organization,
  createOrganization,
  updateOrganization,
} from "@/server/organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback } from "../ui/avatar";
import UploadImageInput from "../upload/upload-image-input";
import { Textarea } from "../ui/textarea";
const formSchema = organizationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export function OrganizationForm({
  organization,
  onSuccess,
}: {
  organization?: Organization;
  onSuccess?: (organization: Organization) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: organization?.name ?? "",
      imageUrl: organization?.imageUrl ?? undefined,
      description: organization?.description ?? "",
    },
  });
  const { executeAsync: createAsync, status: createStatus } =
    useAction(createOrganization);

  const { executeAsync: updateAsync, status: updateStatus } =
    useAction(updateOrganization);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = organization
      ? await updateAsync({ ...values, id: organization.id })
      : await createAsync(values);

    if (result?.data?.id) {
      onSuccess?.(result.data as Organization);
    } else {
      displayError({
        message:
          "Une erreur s'est produite lors de la création de l'organisation",
      });
    }
  };

  const imageUrl = form.getValues("imageUrl");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-4">
          <FormLabel>Logo de l&apos;organisation</FormLabel>

          <Avatar className="w-20 h-20 text-xl">
            {!!imageUrl?.length && typeof imageUrl === "string" ? (
              <Image
                src={form.getValues("imageUrl") as string}
                alt="Avatar"
                width={44}
                height={44}
                className="!w-full object-cover"
              />
            ) : (
              <AvatarFallback>{form.getValues("name")[0] || ""}</AvatarFallback>
            )}
          </Avatar>

          <UploadImageInput
            folder="MEMBER_PROFILE_PICTURES"
            setImageUrl={(url) => {
              form.setValue("imageUrl", url);
              form.trigger("imageUrl");
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l&apos;organisation</FormLabel>
              <FormControl>
                <Input placeholder="ex: Apple Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="ex: Apple Inc. est une organisation américaine spécialisée dans les technologies informatiques."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={
              createStatus === "executing" || updateStatus === "executing"
            }
          >
            {organization ? "Mettre à jour" : "Créer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
