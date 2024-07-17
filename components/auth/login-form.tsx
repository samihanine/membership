"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GoogleButton from "./google-button";
import { useState } from "react";
import { loginWithPassword } from "@/server/auth";
import { Card } from "../ui/card";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setLoading(true);

    const error = await loginWithPassword({ email, password });

    if (error) {
      setError(error);
    }

    setLoading(false);
  };

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

        {error && (
          <Card className="text-sm text-medium text-center p-2 bg-red-50 dark:bg-red-200">
            <p className="text-red-500">{error}</p>
          </Card>
        )}

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
