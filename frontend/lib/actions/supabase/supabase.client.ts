import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SECRET = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const SUPABASE_SERVICE_SECRET = process.env.SUPABASE_SERVICE_KEY || "";


export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_SECRET
);

// export const supabaseAdmin = createClient<Database>(
//   SUPABASE_URL,
//   SUPABASE_SERVICE_SECRET
// );
