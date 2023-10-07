import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { createProblemStatistics, getProblemById } from "@/lib/actions/supabase/problems.actions";
import {
  createPlantStatistics,
  getPlantByUserId, updatePlantGrowth
} from "@/lib/actions/supabase/plants.actions";


export async function POST(request: NextRequest) {
  const body = await request.json();
  const amount = body.amount as number;
  const problemId = body.problemId as string;

  const client = createRouteHandlerClient<Database>({ cookies });
  const problem = await getProblemById(client, problemId);

  await createProblemStatistics(client, {
    daily_amount: amount,
    goal: problem.current_goal,
    problem_id: problem.id,
    user_id: problem.user_id,
  });

  const plant = await getPlantByUserId(client, problem.user_id);

  await updatePlantGrowth(client, plant, amount, problem.current_goal);

  await createPlantStatistics(client, {
    growth: plant.growth,
    growth_multiplier: plant.growth_multiplier,
    plant_id: plant.id,
    owner: plant.owner,
  });

  return NextResponse.json({ success: true });
}
