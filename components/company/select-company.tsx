"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Company } from "@/lib/schemas";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SelectCompany({
  companies,
  companyId,
}: {
  companies: Company[];
  companyId: string;
}) {
  const router = useRouter();
  return (
    <Select
      onValueChange={(id) => {
        router.push("/companies/" + id);
      }}
      defaultValue={companies.find((company) => company.id === companyId)?.id}
    >
      <SelectTrigger>
        <SelectValue
          placeholder={
            companies.find((company) => company.id === companyId)?.name
          }
        />
      </SelectTrigger>
      <SelectContent>
        {companies
          ?.sort((a, b) => a.name.localeCompare(b.name))
          .map((company) => (
            <Link href={"/companies/" + company.id} key={company.id}>
              <SelectItem value={company.id}>{company.name}</SelectItem>
            </Link>
          ))}
      </SelectContent>
    </Select>
  );
}
