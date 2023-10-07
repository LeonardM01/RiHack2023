"use client";

import { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/components/providers/AuthProvider";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const router = useRouter();


  const { signInWithGoogle, signInWithGithub } = useContext(AuthContext);

  const signUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch('api/sign-up', {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      })
    })

    if (res.status === 201) {
      router.replace('/login')
    }
  }

  return (
    <main className="mx-auto max-w-[1440px] flex-center w-screen min-h-screen">
      <section>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create a new user account using our account or other providers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-6" onSubmit={(e) => signUp(e)}>
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
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
              <div className="flex flex-col gap-2">
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
                <Button type="submit" className="w-full">Sign up</Button>
                <Button variant="outline" className="w-full" onClick={() => router.replace('/login')}>Log In</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default SignUp;
