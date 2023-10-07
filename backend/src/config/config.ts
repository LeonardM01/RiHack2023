import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase.js";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb://localhost:27017`;
const SERVER_PORT = process.env.SERVER_PORT || 3001;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SECRET = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const SUPABASE_SERVICE_SECRET = process.env.SUPABASE_SERVICE_SECRET || "";

export const supabaseAdmin = createClient<Database>(
   SUPABASE_URL,
   SUPABASE_SERVICE_SECRET
 );

export const config = {
  db: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
