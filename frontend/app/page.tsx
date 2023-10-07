"use client";

import { useContext } from "react";

import { AuthContext } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import CircularLoader from "@/components/loaders/CircularLoader";

const Home = () => {
  const { signOut, user } = useContext(AuthContext);

  if (!user) return (
    <CircularLoader />
  )

  return (
    <main className="flex-center w-screen h-full">
      <Button onClick={signOut}>Log Out</Button>
    </main>
  )
}

export default Home;
