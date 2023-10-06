import { Session } from "@supabase/supabase-js";

interface ContextI {
    signOut: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<string | null>;
  }