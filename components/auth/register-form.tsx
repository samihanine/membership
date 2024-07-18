"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showError } from "@/lib/utils";
import { registerSchema } from "@/lib/schemas";
import { signUpWithPassword } from "@/server/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GoogleButton from "./google-button";

const formSchema = registerSchema;

const RegisterForm = () => {
  const { executeAsync, status } = useAction(signUpWithPassword);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await executeAsync(values);

    if (result?.data?.error) {
      return showError({ message: result.data.error });
    }

    if (
      result?.serverError ||
      result?.validationErrors ||
      result?.bindArgsValidationErrors
    ) {
      return showError({
        message: "Une erreur s'est produite lors de la création du compte.",
      });
    }
  };

  return (
    <div>
      <div className="space-y-3 mb-4">
        <h3 className="text-xl font-semibold">S&apos;inscrire</h3>
        <p className="text-sm text-muted-foreground">
          Créez un compte pour accéder à votre espace personnel.
        </p>
      </div>
      <div className="h-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: John Doe"
                    type="name"
                    {...field}
                    value={field.value}
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
              <FormItem>
                <FormLabel className="flex gap-2">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="ex: john.doe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="h-4" />
          <div className="flex justify-end">
            <Button
              className="z-50 w-full"
              type="submit"
              disabled={status === "executing"}
            >
              Créer un compte
            </Button>
          </div>
        </form>
      </Form>

      <div className="h-4" />
      <GoogleButton>S&apos;inscrire avec Google</GoogleButton>
      <div className="h-4" />
      <p className="text-sm text-center ">
        Vous avez déjà un compte ?{" "}
        <Link
          href={`/login`}
          className="font-bold text-primary !w-full hover:underline"
        >
          Se connecter
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
