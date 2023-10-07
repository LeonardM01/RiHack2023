import { AuthError, Session } from "@supabase/supabase-js";

interface ContextI {
  user: UserI | null,
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
