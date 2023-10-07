import { createProblem } from "@/lib/actions/supabase/problems.actions";
import { getUserByEmail } from "@/lib/actions/supabase/users.actions";
import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { error } from "console";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.json();

  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

  const { data: { session } } = await supabase.auth.getSession();
  console.log(session)

  try {
    const user = await getUserByEmail(supabase, formData.form_response.answers[2].text);

    await createProblem(supabase, {
      created_at: undefined,
      user_id: user.id,
      name: "smoking",
      current_goal: formData.form_response.answers[3].number,
      goal_updated: "2",
    })

    return NextResponse.json(`Success`, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json("Internal server error", { status: 500 })
  }
}
