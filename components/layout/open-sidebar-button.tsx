"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import React from "react";
import Sidebar from "@/components/layout/sidebar";
import { Organization, User } from "@/lib/schemas";

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
      <HamburgerMenuIcon
        className="w-6 h-6 cursor-pointer"
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className="fixed inset-0 bg-card bg-opacity-50 z-[99999]">
          <Sidebar
            className="w-full !border-b-0 h-full"
            organizationId={organizationId}
            organizations={organizations}
            user={user as User}
            closeSidebar={() => setOpen(false)}
          />
        </div>
      )}
    </>
  );
}
