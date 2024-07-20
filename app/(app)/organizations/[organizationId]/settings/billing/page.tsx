import AddPaymentMethodButton from "@/components/billing/add-payment-method-button";
import GetBillingPortalUrlButton from "@/components/billing/get-billing-portal-url-button";
import DeletePaymentMethodButton from "@/components/billing/delete-payment-method-button";
import UpdateDefaultPaymentMethodButton from "@/components/billing/update-default-payment-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaymentMethod } from "@/lib/schemas";
import { getPaymentMethods } from "@/server/payment-method";
import { getOrganization } from "@/server/organization";
import { getCurrentUser } from "@/server/user";
import { StarIcon } from "@heroicons/react/20/solid";
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

  const paymentMethods = await getPaymentMethods({
    organizationId: params.organizationId,
  });

  const organization = await getOrganization({ id: params.organizationId });

  if (!organization) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <CardTitle className="text-lg mb-1">Moyens de paiement</CardTitle>

        <div className="flex flex-wrap gap-3">
          <GetBillingPortalUrlButton organizationId={params.organizationId} />
          <AddPaymentMethodButton organizationId={params.organizationId} />
        </div>
      </div>

      {!paymentMethods?.data?.length && (
        <div>
          <div className="border-b border-border w-full overflow-x-auto" />

          <div className="text-center text-sm text-muted-foreground mt-5">
            Vous n&apos;avez pas encore ajouté de moyen de paiement.
          </div>
        </div>
      )}
      {!!paymentMethods?.data?.length && (
        <div className="flex flex-col gap-5 w-fit">
          {paymentMethods.data
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((paymentMethod) => (
              <Card
                key={paymentMethod.id}
                className="flex flex-col !shadow-none gap-10"
              >
                <CardHeader className="flex justify-between gap-10 flex-row w-full !pb-2 flex-wrap">
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-base font-semibold flex items-center">
                      {paymentMethod.isDefault && (
                        <StarIcon className="h-4 w-4 text-yellow-400 mr-2" />
                      )}
                      {paymentMethod.brand.toLowerCase() === "visa"
                        ? "Visa"
                        : "Mastercard"}{" "}
                      se terminant par {paymentMethod.lastFourDigits}
                    </CardTitle>
                    <CardDescription>
                      Expire le {paymentMethod.expMonth < 10 ? "0" : ""}
                      {paymentMethod.expMonth}/{paymentMethod.expYear}
                    </CardDescription>
                  </div>

                  {paymentMethod.brand.toLowerCase() === "visa" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#1434CB"
                      viewBox="0 12 28 8"
                      className="w-20 !m-0"
                    >
                      <path d="M16.539 9.186a4.155 4.155 0 0 0-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 0 1 1.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 0 0-.149-.199 6.948 6.948 0 0 0-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z" />
                    </svg>
                  )}

                  {paymentMethod.brand.toLowerCase() === "mastercard" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-16 !m-0"
                      viewBox="0 0 152.407 108"
                    >
                      <g>
                        <rect
                          width="152.407"
                          height="108"
                          style={{ fill: "none" }}
                        />
                        <g>
                          <rect
                            x="60.4117"
                            y="25.6968"
                            width="31.5"
                            height="56.6064"
                            style={{ fill: "#ff5f00" }}
                          />
                          <path
                            d="M382.20839,306a35.9375,35.9375,0,0,1,13.7499-28.3032,36,36,0,1,0,0,56.6064A35.938,35.938,0,0,1,382.20839,306Z"
                            transform="translate(-319.79649 -252)"
                            style={{ fill: "#eb001b" }}
                          />
                          <path
                            d="M454.20349,306a35.99867,35.99867,0,0,1-58.2452,28.3032,36.00518,36.00518,0,0,0,0-56.6064A35.99867,35.99867,0,0,1,454.20349,306Z"
                            transform="translate(-319.79649 -252)"
                            style={{ fill: "#f79e1b" }}
                          />
                          <path
                            d="M450.76889,328.3077v-1.1589h.4673v-.2361h-1.1901v.2361h.4675v1.1589Zm2.3105,0v-1.3973h-.3648l-.41959.9611-.41971-.9611h-.365v1.3973h.2576v-1.054l.3935.9087h.2671l.39351-.911v1.0563Z"
                            transform="translate(-319.79649 -252)"
                            style={{ fill: "#f79e1b" }}
                          />
                        </g>
                      </g>
                    </svg>
                  )}
                </CardHeader>

                <CardContent className="flex gap-4 flex-wrap justify-between">
                  <UpdateDefaultPaymentMethodButton
                    paymentMethod={paymentMethod as PaymentMethod}
                  />

                  <DeletePaymentMethodButton
                    paymentMethod={paymentMethod as PaymentMethod}
                  />
                </CardContent>
              </Card>
            ))}

          {paymentMethods.data.length === 0 && (
            <Card className="flex flex-col !shadow-none">
              <CardContent>
                <CardDescription>
                  Vous n&apos;avez pas encore ajouté de moyen de paiement.
                </CardDescription>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
