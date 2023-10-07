import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type ConversationInsert = Database["public"]["Tables"]["conversations"]["Insert"]

export async function createConversations(client: SupabaseClient<Database>, conversation: ConversationInsert) {
  const { data, error } = await client
    .from("conversations")
    .insert(conversation);

  if (error) {
    throw error;
  }
  return data;
}

export async function listConversations(client: SupabaseClient<Database>, userId:string) {

  const { data, error } = await client
    .from("conversations")
    .select("*")
    .or("random_user_id.eq."+userId+",initial_user_id.eq."+userId)


  if (error) {
    throw error;
  }
  return data;
}