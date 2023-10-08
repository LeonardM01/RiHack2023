import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import SupabaseAuthProvider from "@/components/providers/AuthProvider";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RiGrow",
  description: "Positive mind",
  themeColor: "#0D1117",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
  manifest: '/manifest.json'
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${roboto.className} text-white min-w-screen bg-black-100`}>
        <SupabaseAuthProvider>
          {children}
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
