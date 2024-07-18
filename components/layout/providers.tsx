"use client";

import React from "react";
import ThemeProvider from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        <NextTopLoader zIndex={99999} color="#f97415" />
        {children}
      </ThemeProvider>
    </>
  );
}
