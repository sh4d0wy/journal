import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { api } from "~/trpc/server";
import Sidebar from "./_components/Sidebar";
import Middle from "./_components/Middle";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "sakshambhugra8@gmail.com" });

  return (
    <main className="flex gap-[1vw] items-center justify-center h-[100vh]">
    
      <Middle text="home"/>
    </main>
  );
}

async function CrudShowcase() {
  // // const latestPost = await api.post.getLatest.query();

  // return (
  //   <div className="w-full max-w-xs">
  //     {latestPost ? (
  //       <p className="truncate">Your most recent post: {latestPost.name}</p>
  //     ) : (
  //       <p>You have no posts yet.</p>
  //     )}

  //     <CreatePost />
    // </div>
  // );
}
