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
  const URL = process.env.NEXT_PUBLIC_URL;

  // Sign Out
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Sign-In with Github
  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${URL}/auth/callback`,
      },
    });
  };

  // Sign-In with Google
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${URL}/auth/callback`,
      },
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

const exposed: ContextI = {
    signOut,
    signInWithGithub,
    signInWithGoogle,
    signInWithEmail,
  };

  return (
    <AuthContext.Provider value={exposed}>{children}</AuthContext.Provider>
  );
}
