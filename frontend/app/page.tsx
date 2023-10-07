"use client";

import { useContext } from "react";

import { AuthContext } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/actions/supabase/supabase.client";

const Home = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <main>
      <Button onClick={signOut}>Log Out</Button>   
    </main>
  )
}

export default Home;