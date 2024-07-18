"use client";

import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import Link from "next/link";

export function LogoText({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center space-x-2", className)}>
      <Logo />
      <span className="text-lg font-bold">Membership</span>
    </Link>
  );
}
