import OpenSidebarButton from "@/components/layout/open-sidebar-button";
import Sidebar from "@/components/layout/sidebar";
import { LogoText } from "@/components/ui/logo-text";
import { Organization, User } from "@/lib/schemas";
import { getOrganizations } from "@/server/organization";
import { getCurrentUser } from "@/server/user";

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
      <main className="w-full h-full flex">
        <div className="flex w-full pt-10 sm:pt-0">
          <div className="flex flex-col h-screen sm:w-60">
            {user && (
              <>
                <Sidebar
                  className="flex-1 fixed hidden sm:flex sm:w-60"
                  organizationId={params.organizationId}
                  organizations={(organizations?.data as Organization[]) || []}
                  user={user as User}
                />
                <header className="flex sm:hidden fixed items-center justify-between w-full px-5 py-3 bg-card border-b border-borderfixed top-0 left-0 right-0">
                  <LogoText />

                  <OpenSidebarButton
                    organizationId={params.organizationId}
                    organizations={
                      (organizations?.data as Organization[]) || []
                    }
                    user={user as User}
                  />
                </header>
              </>
            )}
          </div>

          <section className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-10 py-10">
            {children}
          </section>
        </div>
      </main>
    </>
  );
}
