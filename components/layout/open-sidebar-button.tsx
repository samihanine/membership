"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import React from "react";
import Sidebar from "@/components/layout/sidebar";
import { Organization, User } from "@/lib/schemas";
import { createPortal } from "react-dom";

export default function OpenSidebarButton({
  organizationId,
  organizations,
  user,
}: {
  organizationId: string;
  organizations: Organization[];
  user: User;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <HamburgerMenuIcon className="w-6 h-6 cursor-pointer hover:text-primary" />
      </button>
      {open && (
        <>
          {createPortal(
            <div className="fixed inset-0">
              <Sidebar
                className="w-full h-screen border-b-0 bg-card"
                organizationId={organizationId}
                organizations={organizations}
                user={user as User}
                closeSidebar={() => setOpen(false)}
              />
            </div>,
            document.body,
          )}
        </>
      )}
    </>
  );
}
