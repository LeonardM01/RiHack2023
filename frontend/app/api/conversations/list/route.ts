import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { listConversations } from "@/lib/actions/supabase/conversations.actions";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url)
  const userId = searchParams.get("userId")
  console.log(userId)
  const client = createRouteHandlerClient<Database>({ cookies });

  const response = await listConversations(client, userId);
  console.log(response)
  return NextResponse.json(response);
}