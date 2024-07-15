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
import { displayError } from "@/lib/error";
import { Member, memberSchema } from "@/lib/schemas";
import { createMember, updateMember } from "@/server/member";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect } from "react";
import Image from "next/image";

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
      companyId: member?.companyId ?? (params.companyId as string) ?? "",
      membershipExpiresAt: member?.membershipExpiresAt,
    },
  });

  useEffect(() => {
    form.register("imageUrl");
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const result = member
      ? await updateMember(values as Member & { id: string })
      : await createMember(values);

    console.log(result);

    if (result?.data?.id) {
      onSuccess?.(result.data as Member);
    } else {
      displayError({
        message:
          "Une erreur s'est produite lors de la création de l'entreprise",
      });
    }
  };

  const imageUrl = form.getValues("imageUrl") as string;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between items-center gap-4">
          <Avatar className="w-20 h-20 text-xl">
            {!!imageUrl.length && typeof imageUrl === "string" && (
              <Image
                src={form.getValues("imageUrl") as string}
                alt="Avatar"
                width={44}
                height={44}
              />
            )}
            <AvatarFallback>
              {form.getValues("firstName")[0]}{" "}
              {form.getValues("lastName")?.[0] || ""}
            </AvatarFallback>
          </Avatar>

          <Input
            type="file"
            accept="image/*"
            className="!w-fit"
            onChange={async (e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              if (file.size > 1_000_000) {
                displayError({ message: "L'image ne doit pas dépasser 1Mo" });
                return;
              }

              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                console.log(reader.result);
                form.setValue("imageUrl", reader.result as string);
                form.trigger("imageUrl");
              };
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2">
                Date d'expiration de l'adhésion{" "}
                <FormDescription>(optionnel)</FormDescription>
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button className="z-50" type="submit">
            {member ? "Mettre à jour" : "Ajouter un membre"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
