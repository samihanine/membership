import LogOutButton from "@/components/auth/log-out-button";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/server/user";
import Link from "next/link";
import { getOrganizations } from "@/server/organization";
import SelectOrganization from "@/components/organization/select-organization";
import { Organization } from "@/lib/schemas";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { organizationId: string };
}) {
  const user = await getCurrentUser();
  const organizations = await getOrganizations({});

  return (
    <>
      <Header
        links={[
          {
            href: `/organizations/${params.organizationId}`,
            label: "Tableau de bord",
          },
          {
            href: `/organizations/${params.organizationId}/members`,
            label: "Membres",
          },
          {
            href: `/organizations/${params.organizationId}/settings`,
            label: "Paramètres",
          },
        ]}
      >
        {user && params.organizationId && !!organizations?.data && (
          <>
            <SelectOrganization
              organizations={(organizations.data as Organization[]) || []}
              organizationId={params.organizationId}
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

      <main className="w-full h-full px-5">
        <section className="max-w-7xl w-full mx-auto py-10">{children}</section>

        <Footer />
      </main>
    </>
  );
}
