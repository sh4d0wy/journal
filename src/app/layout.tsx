import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Orb from "./_components/Orb";
import Sidebar from "./_components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "JournalApp",
  description: "Keep track of your progress by gamifying it",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-[url("/bg.png")] h-[100vh] w-[100vw] text-[#5B5075] flex justify-center items-center gap-10`}>
        <TRPCReactProvider>
          <Sidebar/>
          {children}
          </TRPCReactProvider>
      </body>
    </html>
  );
}
