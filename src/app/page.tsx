import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { api } from "~/trpc/server";
import Sidebar from "./_components/Sidebar";
import Middle from "./_components/Middle";
import Orb from "./_components/Orb";
import { useRouter } from "next/router";

export default async function Home() {
  // noStore();
  // const hello = await api.post.hello.query({ text: "sakshambhugra8@gmail.com" });
// const router = useRouter();
  return (
    <main>
      <Middle text="Dashboard"/>
    </main>
  );
}