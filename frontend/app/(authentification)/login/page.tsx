"use client";

import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from '@/components/providers/AuthProvider'
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signInWithGoogle, signInWithGithub, signInWithEmail } = useContext(AuthContext);

  const handleSignIn = () => {
    const res = signInWithEmail(email, password);

    if (!res) router.replace('/')
  }

  return (
    <main className="mx-auto max-w-[1440px] flex-center w-screen min-h-screen">
      <section>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            <CardDescription>
              Log in to your existing account with our account or using other providers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="rihack@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-center flex-col gap-4 pt-5">
            <Button
              variant="outline"
              className="w-full flex relative"
              onClick={signInWithGoogle}
            >
              <Image
                src="/assets/general/icons/google-logo.svg"
                width={20}
                height={20}
                className="absolute left-4"
                alt="google logo"
              />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full flex relative"
              onClick={signInWithGithub}
            >
              <Image
                src="/assets/general/icons/github-logo.svg"
                width={20}
                height={20}
                className="absolute left-4"
                alt="github logo"
              />
              Continue with Github
            </Button>
            <Button className="w-full" onClick={() => handleSignIn()}>Log In</Button>
            <Button variant="outline" className="w-full" onClick={() => router.replace('/sign-up')}>Sign Up</Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default Login;
