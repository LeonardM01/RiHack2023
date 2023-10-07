"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import {
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/supabase";
import { ContextI, UserI } from "@/types";

export const AuthContext = createContext<ContextI>({
  user: null,
  isLoading: true,
  signOut: async () => { },
  signInWithGithub: async () => { },
  signInWithGoogle: async () => { },
  signInWithEmail: async (email: string, password: string) => null,
});

export default function SupabaseAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const URL = process.env.NEXT_PUBLIC_URL;

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const [user, setUser] = useState<UserI | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: userData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id || "")

      setUser({
        id: user?.id || "",
        email: user?.email || "",
        first_name: userData![0].first_name,
        last_name: userData![0].last_name,
        avatar: userData![0].avatar,
      })
      setIsLoading(false);
    } else {
      setUser(null)
    }
  }

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

  useEffect(() => {
    getUserData();
  }, [])

  const exposed: ContextI = {
    user,
    isLoading,
    signOut,
    signInWithGithub,
    signInWithGoogle,
    signInWithEmail,
  };

  return (
    <AuthContext.Provider value={exposed}>{children}</AuthContext.Provider>
  );
}
