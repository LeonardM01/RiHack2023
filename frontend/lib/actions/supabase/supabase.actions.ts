import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export async function getPlant(client: SupabaseClient<Database>, plantId: string) {
  const { data, error } = await client
    .from("plants")
    .select("*")
    .eq("id", plantId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getAllPlants(client: SupabaseClient<Database>) {
  const { data, error } = await client.from("plants").select("*");

  if (error) {
    throw error;
  }

  return data;
}
