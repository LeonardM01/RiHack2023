import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { createConversations } from "@/lib/actions/supabase/conversations.actions";

export async function POST(request: NextRequest) {
  const body = await request.json()
  const userId : string = body.userId as string;
  console.log(userId)
  const client = createRouteHandlerClient<Database>({ cookies });

  const converstion = await createConversations(client,{
    initial_user_id: userId
  })

  return NextResponse.json({ success: true });
}