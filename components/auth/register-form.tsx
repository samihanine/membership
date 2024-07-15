"use client";

import GoogleButton from "./google-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpWithPassword } from "@/server/auth";
import { useState } from "react";

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    const result = await signUpWithPassword({
      email,
      password,
      name,
    });

    if (result) {
      setError(result);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="space-y-3 mb-10">
        <h3 className="text-xl font-semibold">S&apos;inscrire</h3>
        <p className="text-sm text-muted-foreground">
          Créez un compte pour accéder à votre espace personnel.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input name="name" placeholder="Prénom et nom" />


        <Input placeholder="Email" name="email" type="email" />

        <Input
          name="password"
          type="password"
          min="8"
          placeholder="Mot de passe"
        />

        <Input
          name="password_confirmation"
          type="password"
          min="8"
          placeholder="Confirmer le mot de passe"
        />

        {error && (
          <p className="text-sm text-red-500 text-medium text-center">
            {error}
          </p>
        )}

        <div className="space-y-2 !mt-10 !mb-8">
          <Button className="!w-full" disabled={loading}>
            {loading ? "Chargement..." : "S'inscrire"}
          </Button>

          <GoogleButton>
            S&apos;inscrire avec Google
          </GoogleButton>
        </div>

        <p className="text-sm text-center ">
          Vous avez déjà un compte ?{" "}
          <Link
            href={`/login`}
            className="font-bold !w-full hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
