import LogOutButton from "@/components/auth/log-out-button";
import ErrorBanner from "@/components/layout/error-banner";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/server/user";
import Link from "next/link";
import { getCompanies } from "@/server/company";
import SelectCompany from "@/components/company/select-company";
import { Company } from "@/lib/schemas";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { companyId: string };
}) {
  const user = await getCurrentUser();
  const companies = await getCompanies({});

  return (
    <>
      <Header
        links={[
          {
            href: `/companies/${params.companyId}`,
            label: "Tableau de bord",
          },
          {
            href: `/companies/${params.companyId}/members`,
            label: "Membres",
          },
          {
            href: `/companies/${params.companyId}/card`,
            label: "Visuel",
          },
          {
            href: `/companies/${params.companyId}/settings`,
            label: "Paramètres",
          },
        ]}
      >
        {user && params.companyId && !!companies?.data?.length && (
          <>
            <SelectCompany
              companies={(companies.data as Company[]) || []}
              companyId={params.companyId}
            />
            <LogOutButton />{" "}
          </>
        )}

        {!user && (
          <Link href="/login">
            <Button>Se connecter</Button>
          </Link>
        )}
      </Header>

      <ErrorBanner />

      <main className="w-full h-full px-5 lg:px-0">{children}</main>

      <Footer />
    </>
  );
}
