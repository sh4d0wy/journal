import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Orb from "./_components/Orb";
import Sidebar from "./_components/Sidebar";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import { env } from "process";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "JournalApp",
  description: "Keep track of your progress by gamifying it",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-[url('/bg.png')]`}>
        <TRPCReactProvider>
          <Orb/>
          <div className=" h-[100vh] w-[100vw] text-[#5B5075] flex justify-center items-center gap-10">
            <SignedIn>
              <Sidebar/>
            </SignedIn>
          {children}
          </div>
          </TRPCReactProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
