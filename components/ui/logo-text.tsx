"use client";

import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function LogoText({ className = "" }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-4", className)}>
      <Logo />
      <span className="text-xl font-bold">AssoScale</span>
    </div>
  );
}
