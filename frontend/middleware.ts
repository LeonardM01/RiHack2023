import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { Database } from "./types/supabase";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session && req.nextUrl.pathname !== "/login" && req.nextUrl.pathname !== "/sign-up") {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res;
}

export const config = {
  matcher: "/((?!api|assets|auth|_next/static|_next/image|favicon.ico).*)",
};
