import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createPlant } from "@/lib/actions/supabase/plants.actions";
import { createProblem } from "@/lib/actions/supabase/problems.actions";
import { Database } from "@/types/supabase";

interface InitializeBody {
  goal: number;
  plantName: string;
}

export async function POST(req: NextRequest) {
  const body: InitializeBody = await req.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const user = (await supabase.auth.getUser()).data.user!;
  await createPlant(supabase, {
    name: body.plantName,
    owner: user.id,
    completed: false,
    growth: 0,
    growth_multiplier: 1
  });

  await createProblem(supabase, {
    name: "smoking",
    current_goal: body.goal,
    user_id: user.id,
    goal_updated: new Date().toTimeString()
  });

  const { error } = await supabase.from("profiles").update({ initialized: true }).eq("id", user.id);

  if (error) {
    throw error;
  }


  return NextResponse.json({success: true});
}
