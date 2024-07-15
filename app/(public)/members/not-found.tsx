"use client";

export default function NotFound() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mb-16 items-center justify-center text-center">
      <h2 className="my-2 font-heading text-2xl font-bold mt-5 text-red-500">
        Membre introuvable
      </h2>
      <p>
        Désolé, le member que vous cherchez n&apos;existe pas.
      </p>
    </div>
  );
}
