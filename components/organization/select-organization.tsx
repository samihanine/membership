"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Organization } from "@/lib/schemas";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function SelectOrganization({
  organizations,
  organizationId,
}: {
  organizations: Organization[];
  organizationId: string;
}) {
  const router = useRouter();

  return (
    <Select
      onValueChange={(id) => {
        router.push("/organizations/" + id);
      }}
      defaultValue={
        organizations.find((organization) => organization.id === organizationId)
          ?.id
      }
    >
      <SelectTrigger>
        <SelectValue
          placeholder={
            organizations.find(
              (organization) => organization.id === organizationId,
            )?.name
          }
        />
      </SelectTrigger>
      <SelectContent>
        {organizations
          ?.sort((a, b) => a.name.localeCompare(b.name))
          .map((organization) => (
            <Link
              href={"/organizations/" + organization.id}
              key={organization.id}
            >
              <SelectItem value={organization.id}>
                {organization.name}
              </SelectItem>
            </Link>
          ))}

        <Link href="/onboarding">
          <Button variant={"outline"} className="m-2">
            Ajouter une organisation
          </Button>
        </Link>
      </SelectContent>
    </Select>
  );
}
