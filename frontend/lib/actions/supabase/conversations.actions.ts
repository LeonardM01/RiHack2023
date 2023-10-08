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

export async function listConversations(client: SupabaseClient<Database>, userId: string) {

  const { data, error } = await client
    .from("conversations")
    .select("*")
    .or("random_user_id.eq." + userId + ",initial_user_id.eq." + userId)

  const mappedData = data!.map((conversation: any) => {
    const friendId = conversation.initial_user_id === userId ? conversation.random_user_id as string : conversation.initial_user_id as string;
    return {
      ...conversation,
      friendId
    };
  })

  if (error) {
    throw error;
  }

  return mappedData;
}

export async function listConversationsById(client: SupabaseClient<Database>, convoId: string, userId: string) {

  const { data, error } = await client
    .from("conversations")
    .select("*")
    .eq("id", convoId)

  const mappedData = data!.map((conversation: any) => {
    const friendId = conversation.initial_user_id === userId ? conversation.random_user_id as string : conversation.initial_user_id as string;
    return {
      ...conversation,
      friendId
    };
  })

  if (error) {
    throw error;
  }

  return mappedData;
}