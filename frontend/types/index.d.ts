import { Session } from "@supabase/supabase-js";

interface ContextI {
    user: any;
    error: any;
    isLoading: boolean;
    session: Session | null | undefined;
    signOut: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<string | null>;
  }