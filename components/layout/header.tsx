"use client";

import { LogoText } from "@/components/ui/logo-text";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import HeaderLink from "./header-link";
import ThemeToggle from "./theme-toggle";

export default function Header({
  links,
  children,
}: {
  links: {
    href: string;
    label: string;
  }[];
  children?: React.ReactNode;
}) {
  const { isMobile } = useMediaQuery();
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav
        id="navbar"
        className={cn(
          "bg-white dark:bg-opacity-50 border-b dark:bg-black w-full border-b-input h-fit",
          "bg-opacity-90 backdrop-blur-md",
        )}
      >
        <div className="mx-auto px-5 w-full">
          <div className="relative flex flex-row gap-5 items-center justify-between h-16">
            <div className="relative z-20 flex justify-between w-max">
              <LogoText />
            </div>

            {!isMobile && (
              <>
                <div className="flex items-center gap-8">
                  {links.map((link) => (
                    <HeaderLink key={link.href} href={link.href}>
                      {link.label}
                    </HeaderLink>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {children}
                  <ThemeToggle />
                </div>
              </>
            )}

            {isMobile && (
              <>
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <MenuIcon />
                  </SheetTrigger>
                  <SheetContent side="left" className="!px-0">
                    <div className="px-3 py-10 flex flex-col justify-between items-center h-full">
                      <LogoText />

                      <div className="flex flex-col gap-2 items-center w-full">
                        {links.map((link) => (
                          <HeaderLink
                            key={link.href}
                            href={link.href}
                            className="text-xl"
                            onClick={() => setOpen(false)}
                          >
                            {link.label}
                          </HeaderLink>
                        ))}
                      </div>

                      <div className="flex items-center justify-center flex-wrap gap-2">
                        {children}
                        <ThemeToggle />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
