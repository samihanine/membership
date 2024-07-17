"use client";

import { cn } from "@/lib/utils";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={cn("text-2xl underline text-primary", className)}>
      <svg
        fill="currentColor"
        className="h-8 w-8"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="m0 24c15.2548 0 24-8.7452 24-24 0 15.2548 8.7452 24 24 24-15.2548 0-24 8.7452-24 24 0-15.2548-8.7452-24-24-24z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    </span>
  );
}
