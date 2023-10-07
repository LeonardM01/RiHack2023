import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getUserById(client: SupabaseClient<Database>, userId: string) {
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}