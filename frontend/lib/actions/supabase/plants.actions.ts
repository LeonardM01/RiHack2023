import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

type InsertPlant = Database["public"]["Tables"]["plants"]["Insert"]

export async function createPlant(client: SupabaseClient<Database>, plant: InsertPlant) {
  const { data, error } = await client
    .from("plants")
    .insert(plant)

  if (error) {
    throw error;
  }
  return data;
}

export async function getPlantByUserId(client: SupabaseClient<Database>, userId: string) {
  const { data, error } = await client
    .from("plants")
    .select("*")
    .eq("owner", userId)
    .single();

  if (error) {
    throw error;
  }
  return data;
}

export async function getPlantById(client: SupabaseClient<Database>, plantId: string) {
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

type PlantUpdateData =Database["public"]["Tables"]["plants"]["Update"];

export async function updatePlant(client: SupabaseClient<Database>, plantId: string,dataToUpdate: PlantUpdateData) {
  const { data, error } = await client
    .from("plants")
    .update(dataToUpdate)
    .eq("id", plantId)
    .single();

  if (error) {
    throw error;
  }
  return data;
}

type CreatePlantStatistics = Database["public"]["Tables"]["plant_statistics"]["Insert"]

export async function createPlantStatistics(client:SupabaseClient<Database>, statistics : CreatePlantStatistics){

  const { data, error } = await client
    .from("plant_statistics")
    .insert(statistics)

  if (error) {
    throw error;
  }
  return data;

}

