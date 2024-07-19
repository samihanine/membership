import { handleGoogleCallback } from "@/server/auth";
import { NextResponse, NextRequest } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const code = searchParams.get("code");
  const state = searchParams.get("state") || undefined;
  const scopes = searchParams.get("scope")?.split(",") || [];

  if (!code?.length) {
    return NextResponse.redirect(baseUrl + "/login?error=google_login_failed");
  }

  const route = await handleGoogleCallback({ code, state, scopes }).catch(
    (error) => {
      console.error("Error handling Google callback:", error);
      return "/login?error=google_login_failed";
    },
  );

  return NextResponse.redirect(baseUrl + route);
}
