"use client";

import { updateCurrentUser } from "@/server/user";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const phoneNumber = formData.get("phoneNumber") as string;

      setIsLoading(true);
      await updateCurrentUser({ phoneNumber });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/reservation");
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-5 w-full mt-20"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-medium text-foreground text-center">
        Entrez votre numéro de téléphone pour continuer
      </h2>
      <Input
        placeholder="Numéro de téléphone"
        name="phoneNumber"
        className="w-full max-w-xl"
        required
      />

      <Button type="submit" disabled={isLoading}>
        Continuer
      </Button>
    </form>
  );
}
