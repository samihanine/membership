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
import { User, userSchema } from "@/lib/schemas";
import { showError } from "@/lib/utils";
import { updateUser } from "@/server/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback } from "../ui/avatar";
import UploadImageInput from "../upload/upload-image-input";

const formSchema = userSchema.partial().omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export function UserForm({
  user,
  onSuccess,
}: {
  user: User;
  onSuccess?: (user: User) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? "",
      imageUrl: user?.imageUrl ?? undefined,
      email: user?.email ?? "",
    },
  });

  const { executeAsync: updateAsync, status: updateStatus } =
    useAction(updateUser);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    const result = await updateAsync({ ...user, ...values, id: user.id });

    console.log("result", result);
    if (result?.data?.id) {
      onSuccess?.(result.data as User);
    } else {
      showError({
        message:
          "Une erreur s'est produite lors de la mise à jour de l'utilisateur.",
      });
    }
  };

  const imageUrl = form.getValues("imageUrl");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-4">
          <FormLabel>Image</FormLabel>

          <Avatar className="w-20 h-20 text-xl">
            {!!imageUrl?.length && typeof imageUrl === "string" ? (
              <img
                src={form.getValues("imageUrl") as string}
                alt="Avatar"
                width={44}
                height={44}
                className="!w-full object-cover"
              />
            ) : (
              <AvatarFallback>
                {form.getValues("name")?.[0] || ""}
              </AvatarFallback>
            )}
          </Avatar>

          <UploadImageInput
            folder="USER_PROFILE_PICTURES"
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
              <FormLabel>Prénom et nom</FormLabel>
              <FormControl>
                <Input placeholder="ex: John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="ex: john@apple.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={updateStatus === "executing"}
        >
          Mettre à jour
        </Button>
      </form>
    </Form>
  );
}
