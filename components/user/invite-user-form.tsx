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
import { showError, showSuccess } from "@/lib/utils";
import { invitationSchema, Invitation } from "@/lib/schemas";
import { createInvitation } from "@/server/invitation";
import { useAction } from "next-safe-action/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

const formSchema = invitationSchema.omit({
  id: true,
  token: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  acceptedAt: true,
  invitedByUserId: true,
});

export function InviteUserForm({
  onSuccess,
  organizationId,
}: {
  onSuccess?: (i: Invitation) => void;
  organizationId: string;
}) {
  const { executeAsync: createAsync, status: createStatus } =
    useAction(createInvitation);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "ADMINISTRATOR",
      organizationId: organizationId,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await createAsync({
      email: values.email,
      role: values.role,
      organizationId,
    });

    if (result?.data?.error) {
      return showError({ message: result.data.error });
    } else if (result?.data?.invitation) {
      showSuccess("L'utilisateur a été invité par email avec succès");
      onSuccess?.(result.data.invitation as Invitation);
    } else {
      showError({
        message:
          "Une erreur s'est produite lors de l'invitation de l'utilisateur",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2">Email</FormLabel>
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accès</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un rôle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ADMINISTRATOR">Administrateur</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            className="z-50"
            type="submit"
            disabled={createStatus === "executing"}
          >
            {"Inviter un utilisateur"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
