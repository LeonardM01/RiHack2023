import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { listMessagesByConvId } from "@/lib/actions/supabase/messages.actions";

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url)
  const convId = searchParams.get("convId") as string
  const client = createRouteHandlerClient<Database>({ cookies });

  const response = await listMessagesByConvId(client, convId);
  console.log(response)
  return NextResponse.json(response);
}