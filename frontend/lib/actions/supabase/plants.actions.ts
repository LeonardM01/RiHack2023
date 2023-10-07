import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

type Plant = Database["public"]["Tables"]["plants"]["Row"]
type InsertPlant = Database["public"]["Tables"]["plants"]["Insert"]

export async function createPlant(client: SupabaseClient<Database>, plant: InsertPlant) {
  const { data, error } = await client
    .from("plants")
    .insert(plant);

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

type PlantUpdateData = Database["public"]["Tables"]["plants"]["Update"];

export async function updatePlant(client: SupabaseClient<Database>, plantId: string, dataToUpdate: PlantUpdateData) {
  const { data, error } = await client
    .from("plants")
    .update(dataToUpdate)
    .eq("id", plantId);

  if (error) {
    throw error;
  }
  return data;
}

type CreatePlantStatistics = Database["public"]["Tables"]["plant_statistics"]["Insert"]

export async function createPlantStatistics(client: SupabaseClient<Database>, statistics: CreatePlantStatistics) {

  const { data, error } = await client
    .from("plant_statistics")
    .insert(statistics);

  if (error) {
    throw error;
  }
  return data;
}

export async function getPlantStatistics(client: SupabaseClient<Database>, userId: string) {
  const { data, error } = await client
    .from("plant_statistics")
    .select("*")
    .eq('owner', userId)

  if (error) {
    throw error;
  }

  return data!;
}

const BASE_GROWTH_RATE = 0.0333;

export async function updatePlantGrowth(client: SupabaseClient<Database>, plant: Plant, amount: number, goal: number) {
  const newMultiplier = calculateNewPlantMultiplier(plant, amount, goal);

  const growth = plant.growth + BASE_GROWTH_RATE * newMultiplier;
  await updatePlant(client, plant.id, { growth, growth_multiplier: newMultiplier });
  plant.growth = growth;
  plant.growth_multiplier = newMultiplier;

  return plant;
}

const MIN_MULTIPLIER_VALUE = 0.1;

function calculateNewPlantMultiplier(plant: Plant, amount: number, goal: number) {
  const goalReached = amount <= goal ? 1 : -1;
  const percentage = amount <= goal ? amount / goal : amount / goal - 1;

  const multiplierChange = 2 * percentage * percentage * goalReached;

  const multiplier = Math.max(plant.growth_multiplier + multiplierChange, MIN_MULTIPLIER_VALUE);
  return multiplier >= 1 ? 1 : multiplier;
}

