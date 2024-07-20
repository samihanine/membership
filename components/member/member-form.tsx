"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Member, memberSchema } from "@/lib/schemas";
import { showError } from "@/lib/utils";
import { createMember, updateMember } from "@/server/member";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import UploadImageInput from "../upload/upload-image-input";
import MemberAvatar from "./member-avatar";

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
      membershipExpiresAt: member?.membershipExpiresAt,
      address: member?.address ?? "",
      address2: member?.address2 ?? "",
      city: member?.city ?? "",
      region: member?.region ?? "",
      postalCode: member?.postalCode ?? "",
      countryCode: member?.countryCode ?? "",
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="flex justify-between items-center gap-4">
          <MemberAvatar
            size="lg"
            member={
              {
                ...member,
                imageUrl: imageUrl,
                firstName: form.getValues("firstName"),
                lastName: form.getValues("lastName"),
              } as Member
            }
          />

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
          name="firstName"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 gap-3 items-center">
              <FormLabel>
                Prénom
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="!mt-0 col-span-3"
                  required
                  placeholder="ex: Dorian"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 gap-3 items-center">
              <FormLabel>
                Nom<span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="!mt-0 col-span-3"
                  required
                  placeholder="ex: Ham"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 gap-3 items-center">
              <FormLabel className="flex gap-2">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex: dorian@example.com"
                  type="email"
                  className="!mt-0 col-span-3"
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
            <FormItem className="grid grid-cols-4 gap-3 items-center">
              <FormLabel className="flex gap-2">Téléphone </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="06 12 34 56 78"
                  className="col-span-3 !mt-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 gap-3 items-center">
              <FormLabel className="flex gap-2">Adresse </FormLabel>
              <FormControl>
                <Input
                  placeholder="ex: 1 rue de Paris"
                  className="col-span-3 !mt-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address2"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 gap-3 items-center">
              <FormLabel className="flex gap-2">Adresse 2</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="ex: appartement 12"
                  className="col-span-3 !mt-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 gap-3 items-center">
              <FormLabel className="flex gap-2">Ville</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex: Paris"
                  className="col-span-3 !mt-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 gap-3 items-center">
              <FormLabel className="flex gap-2">Région</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex: Ile de France"
                  className="col-span-3 !mt-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="countryCode"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 gap-3 items-center">
              <FormLabel className="flex gap-2">Pays</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex: France"
                  className="col-span-3 !mt-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="z-50 w-full mt-4"
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
