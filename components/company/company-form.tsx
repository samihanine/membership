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
import { Company, createCompany } from "@/server/company";
import { companySchema } from "@/lib/schemas";
import { redirect, useRouter } from "next/navigation";
import { displayError } from "@/lib/error";

const formSchema = companySchema.omit({ id: true });

export function CompanyForm({ company }: { company?: Company }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company?.name ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await createCompany(values);

    if (result?.data?.id) {
      router.push(`/companies/${result.data.id}`);
    } else {
      displayError({
        message:
          "Une erreur s'est produite lors de la création de l'entreprise",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l'entreprise</FormLabel>
              <FormControl>
                <Input placeholder="Apple Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">{company ? "Mettre à jour" : "Créer"}</Button>
        </div>
      </form>
    </Form>
  );
}
