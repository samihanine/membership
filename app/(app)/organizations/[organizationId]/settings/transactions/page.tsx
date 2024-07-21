import TransactionTable from "@/components/transaction/transaction-table";
import { CardTitle } from "@/components/ui/card";
import { Transaction } from "@/lib/schemas";
import { getTransactions } from "@/server/billing";
import { getCurrentUser } from "@/server/user";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { organizationId: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const transactions = await getTransactions({
    organizationId: params.organizationId,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg mb-1">Vos commandes de cartes</CardTitle>
      </div>
      <div>
        <div className="border-b border-border w-full overflow-x-auto" />

        <TransactionTable
          transactions={(transactions?.data as Transaction[]) || []}
        />
      </div>
    </div>
  );
}
