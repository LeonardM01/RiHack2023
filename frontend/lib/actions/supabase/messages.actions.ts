import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export async function listMessagesByConvId(client: SupabaseClient<Database>, convId:string) {

  const { data, error } = await client
    .from("messages")
    .select("*")
    .eq("conversation_id",convId);

  if (error) {
    throw error;
  }
  return data;
}