import { AuthError, Session } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

interface ContextI {
  user: UserI | null,
  isLoading: boolean | null,
  signOut: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<string | null>;
}

interface UserI {
  id: string;
  email: string;
  avatar: string | null;
  first_name: string | null;
  last_name: string | null;
}

export type Problem = Database["public"]["Tables"]["problems"]["Row"]
export type ProblemStatistics = Database["public"]["Tables"]["problem_statistics"]["Row"]
export type ProblemInsert = Database["public"]["Tables"]["problems"]["Insert"]
export type ProblemStatisticsInsert = Database["public"]["Tables"]["problem_statistics"]["Insert"]
