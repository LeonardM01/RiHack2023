import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { Problem, ProblemInsert, ProblemStatisticsInsert } from "@/types";

export async function getProblemById(client: SupabaseClient<Database>, problemId: string) {
  const { data, error } = await client
    .from("problems")
    .select("*")
    .eq("id", problemId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function createProblem(client: SupabaseClient<Database>, problem: ProblemInsert) {
  problem.created_at = new Date().toISOString();
  const { data, error } = await client
    .from("problems")
    .insert(problem);

  if (error) {
    throw error;
  }
  return data;
}

export async function createProblemStatistics(client: SupabaseClient<Database>, statistics: ProblemStatisticsInsert) {
  const { data, error } = await client
    .from("problem_statistics")
    .insert(statistics);

  if (error) {
    throw error;
  }
  return data;
}


export async function getProblemStatistics(client: SupabaseClient<Database>) {
  const { data, error } = await client.from("problem_statistics")
    .select("*");

  if (error) {
    throw error;
  }

  return data!;
}

export async function getUserProblems(client: SupabaseClient<Database>, userId: string): Promise<Problem[]> {
  const { data, error } = await client
    .from("problems")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data!;
}
