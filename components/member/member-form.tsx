"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showError } from "@/lib/utils";
import { Member, memberSchema } from "@/lib/schemas";
import { createMember, updateMember } from "@/server/member";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect } from "react";
import Image from "next/image";
import UploadImageInput from "../upload/upload-image-input";
import { useAction } from "next-safe-action/hooks";
import moment from "moment";

const formSchema = memberSchema.omit({
  createdAt: true,
  deletedAt: true,
  updatedAt: true,
});

export function MemberForm({
  member,
  onSuccess,
}: {
  member?: Member;
  onSuccess?: (member: Member) => void;
}) {
  const { executeAsync: updateAsync, status: updateStatus } =
    useAction(updateMember);
  const { executeAsync: createAsync, status: createStatus } =
    useAction(createMember);

  const params = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(member ? formSchema : formSchema.omit({ id: true })),
    defaultValues: {
      id: member?.id,
      firstName: member?.firstName ?? "",
      lastName: member?.lastName ?? "",
      email: member?.email ?? "",
      phoneNumber: member?.phoneNumber ?? "",
      imageUrl: member?.imageUrl ?? "",
      organizationId:
        (params.organizationId as string) ?? member?.organizationId ?? "",
      membershipExpiresAt:
        member?.membershipExpiresAt ??
        new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
  });

  useEffect(() => {
    form.register("imageUrl");
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = member
      ? await updateAsync(values as Member & { id: string })
      : await createAsync(values);

    if (result?.data?.id) {
      onSuccess?.(result.data as Member);
    } else {
      showError({
        message:
          "Une erreur s'est produite lors de la création de l'organisation.",
      });
    }
  };

  const imageUrl = form.getValues("imageUrl") as string;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between items-center gap-4">
          <Avatar className="w-20 h-20 text-xl">
            {!!imageUrl.length && typeof imageUrl === "string" ? (
              <Image
                src={form.getValues("imageUrl") as string}
                alt="Avatar"
                width={44}
                height={44}
                className="!w-full object-cover"
              />
            ) : (
              <AvatarFallback>
                {form.getValues("firstName")[0]}{" "}
                {form.getValues("lastName")?.[0] || ""}
              </AvatarFallback>
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
        <div className="flex justify-between items-center gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input required placeholder="ex: Dorian" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de famille</FormLabel>
                <FormControl>
                  <Input required placeholder="ex: Ham" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2">
                Email <FormDescription>(optionnel)</FormDescription>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="ex: dorian@example.com"
                  type="email"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2">
                Numéro de téléphone{" "}
                <FormDescription>(optionnel)</FormDescription>
              </FormLabel>
              <FormControl>
                <Input type="tel" placeholder="06 12 34 56 78" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="formattedAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2">
                Adresse complète <FormDescription>(optionnel)</FormDescription>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="ex: 1 rue de la Paix, Paris, FR"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="membershipExpiresAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2">
                Date d&apos;expiration de l&apos;adhésion{" "}
                <FormDescription>(optionnel)</FormDescription>
              </FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value
                      ? moment(new Date(field.value)).format("YYYY-MM-DD")
                      : ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="z-50 w-full"
          type="submit"
          disabled={
            updateStatus === "executing" || createStatus === "executing"
          }
        >
          {member ? "Mettre à jour" : "Ajouter un membre"}
        </Button>
      </form>
    </Form>
  );
}
