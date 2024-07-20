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
import { showError } from "@/lib/utils";
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
  email,
  onSuccess,
}: {
  organization?: Organization;
  onSuccess?: (organization: Organization) => void;
  email?: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: organization?.name ?? "",
      imageUrl: organization?.imageUrl ?? undefined,
      description: organization?.description ?? "",
      email: organization?.email ?? email ?? "",
      address: organization?.address ?? "",
      address2: organization?.address2 ?? "",
      city: organization?.city ?? "",
      postalCode: organization?.postalCode ?? "",
      countryCode: organization?.countryCode ?? "",
      region: organization?.region ?? "",
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
      showError({
        message:
          "Une erreur s'est produite lors de la création de l'organisation.",
      });
    }
  };

  const imageUrl = form.getValues("imageUrl");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full self-center"
      >
        <div className="grid grid-cols-4 gap-3 items-center">
          <Avatar className="w-20 h-20 text-xl col-span-1">
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
            className="col-span-3"
            folder="ORGANIZATION_LOGOS"
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
            <FormItem className="grid grid-cols-4 gap-3 items-center">
              <FormLabel>
                Nom
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="ex: Apple Inc."
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
          name="email"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 gap-3 items-center">
              <FormLabel>
                Email <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="col-span-3 !mt-0"
                  type="email"
                  placeholder="ex: billing@apple.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 gap-3 items-center">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="col-span-3 !mt-0"
                  placeholder="ex: Apple Inc. est une organisation américaine spécialisée dans les technologies informatiques."
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
              <FormLabel>
                Adresse <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="ex: 1 rue de Paris"
                  className="col-span-3 !mt-0"
                  required
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
              <FormLabel>Adresse 2</FormLabel>
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
              <FormLabel>
                Ville <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="ex: Paris"
                  className="col-span-3 !mt-0"
                  required
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
              <FormLabel>
                Région <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="ex: Ile de France"
                  className="col-span-3 !mt-0"
                  required
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
              <FormLabel>
                Pays <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="ex: France"
                  className="col-span-3 !mt-0"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-fit self-center mt-4"
          disabled={
            createStatus === "executing" || updateStatus === "executing"
          }
        >
          {organization ? "Mettre à jour" : "Créer"}
        </Button>
      </form>
    </Form>
  );
}
