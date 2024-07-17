import { handlePaymentSuccess } from "@/server/payment";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const sessionId = searchParams.get("session_id");

  if (!sessionId?.length) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + "/");
  }

  let error: string | undefined = undefined;
  await handlePaymentSuccess(sessionId).catch((e) => {
    error = e;
  });

  if (error) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + "/");
  }

  return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + "/");
}
