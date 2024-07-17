import Providers from "@/components/layout/providers";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const font = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Membership est une application de gestion d'adhésions pour les associations.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${font.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
