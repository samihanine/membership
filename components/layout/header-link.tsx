"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderLink(
  props: LinkProps & { children: React.ReactNode; className?: string },
) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        "text-base font-medium",
        pathname === props.href ? "text-primary" : "text-muted-foreground",
        props.className,
      )}
    />
  );
}
