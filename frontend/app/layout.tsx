import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import SupabaseAuthProvider from "@/components/providers/AuthProvider";
import Navbar from "@/components/general/Navbar";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RiGrow",
  description: "Positive mind",
  themeColor: "black",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${roboto.className} text-white w-screen min-h-[100vh] max-w-8xl mx-auto max-3xl:px-5 bg-black-100`}>
        <SupabaseAuthProvider>
          <Navbar />
          {children}
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
