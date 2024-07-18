"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GoogleButton from "./google-button";
import { loginWithPassword } from "@/server/auth";
import { showError } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";

const LoginForm = () => {
  const { executeAsync, status } = useAction(loginWithPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await executeAsync({ email, password });

    if (result?.data?.error) {
      showError({ message: result?.data?.error });
    }
  };

  const loading = status === "executing";

  return (
    <div>
      <div className="space-y-3 mb-10">
        <h3 className="text-xl font-semibold">Se connecter</h3>
        <p className="text-sm text-muted-foreground">
          Connectez-vous à votre compte pour accéder à votre espace personnel.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input placeholder="Email" type="email" name="email" />

        <Input
          type="password"
          min="8"
          placeholder="Mot de passe"
          name="password"
        />

        <div className="space-y-2 !mt-10 !mb-8">
          <Button type="submit" className="!w-full" disabled={loading}>
            {loading ? "Chargement..." : "Se connecter"}
          </Button>

          <GoogleButton>Se connecter avec Google</GoogleButton>
        </div>

        <p className="text-sm text-center">
          Vous n&apos;avez pas de compte ?{" "}
          <Link
            href={`/register`}
            className="font-bold !w-full hover:underline text-primary"
          >
            S&apos;inscrire
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
