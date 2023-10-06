"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/supabase";
import { ContextI } from "@/types";

export const AuthContext = createContext<ContextI>({
  user: null,
  error: null,
  isLoading: true,
  session: null,
  signOut: async () => {},
  signInWithGithub: async () => {},
  signInWithGoogle: async () => {},
  signInWithEmail: async (email: string, password: string) => null,
});

export default function SupabaseAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const [session, setSession] = useState<Session | null | undefined>(undefined);

  // Sign Out
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Sign-In with Github
  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: "/" },
    });
  };

  // Sign-In with Google
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "/" },
    });
  };

  // Sign-In with Email
  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error.message;
    }

    return null;
  };

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
  };

  // Refresh the Page to Sync Server and Client
  useEffect(() => {
    getSession();
  }, []);

  const exposed: ContextI = {
    user: null,
    error: null,
    isLoading: false,
    session,
    signOut,
    signInWithGithub,
    signInWithGoogle,
    signInWithEmail,
  };

  if(session === undefined) return (
    <div className="w-screen h-screen flex-center">loading...</div>
  )

  if (session === null) {
    router.replace("/login");
  }

  return (
    <AuthContext.Provider value={exposed}>{children}</AuthContext.Provider>
  );
}
