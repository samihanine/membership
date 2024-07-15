"use client";

import { sendContactForm } from "@/server/contact";
import React from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { LampDemo } from "./lamp";

export default function Contact() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] h-full md:h-[calc(100vh-64px)] flex-col md:flex-row">
      <div className="w-full md:w-1/2 md:p-8">
        <ContactForm />
      </div>

      <div
        className="w-full md:w-1/2 bg-foreground h-full hnameden md:flex border-l border-l-input"
        aria-hnameden="true"
      >
        <LampDemo />
      </div>
    </main>
  );
}

function ContactForm() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const companyName = formData.get("companyName") as string;
    const message = formData.get("message") as string;

    const { error } = await sendContactForm({
      firstName,
      lastName,
      companyName,
      email,
      message,
    });

    if (error) {
      setError(error);
      setLoading(false);
      return;
    } else {
      setLoading(false);

      const form = document.getElementById("contact-form") as HTMLFormElement;
      form.reset();

      toast.success("Votre message a bien été envoyé !");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-10 h-full justify-center p-5">
      <div className="text-3xl md:text-5xl font-cabinet-grotesk font-medium text-foreground">
        Contactez-nous.
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Prénom <span className="text-pink-500">*</span>
          </label>
          <Input
            name="firstName"
            className="form-input w-full"
            type="text"
            placeholder="Ex: John"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Nom de famille <span className="text-pink-500">*</span>
          </label>
          <Input
            name="lastName"
            className="form-input w-full"
            type="text"
            placeholder="Ex: Doe"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email <span className="text-pink-500">*</span>
          </label>
          <Input
            name="email"
            className="form-input w-full"
            type="email"
            placeholder="Ex: johndoe@exemple.fr"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="company">
            Nom de l&apos;entreprise
          </label>
          <Input
            name="companyName"
            className="form-input w-full"
            type="text"
            placeholder="Ex: Google"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="role">
            Votre message
            <span className="text-pink-500">*</span>
          </label>
          <Textarea
            name="message"
            className="form-textarea w-full"
            required
            placeholder="Tappez votre message ici"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm font-medium">{error}</div>
        )}

        <Button
          className="px-8 inline-flex items-center !w-full group mt-6"
          disabled={loading}
        >
          {loading ? "Chargement..." : "Envoyer"}
        </Button>
      </form>
    </div>
  );
}
