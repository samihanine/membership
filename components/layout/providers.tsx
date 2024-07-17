"use client";

import React from "react";
import ThemeProvider from "./theme-provider";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster containerStyle={{ zIndex: 99999 }} />
        {children}
      </ThemeProvider>
    </>
  );
}
