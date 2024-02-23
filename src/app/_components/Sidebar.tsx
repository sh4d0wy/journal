"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaChartLine, FaJournalWhills, FaUserFriends } from "react-icons/fa";
import { GiInjustice } from "react-icons/gi";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";
import { userData } from "../_utils/states";
type User = {
  id: number;
  name: string;
  email: string;
  level: number;
  points: number;
  pointsToReach: number;
};

const Sidebar = () => {
  const [active, setActive] = useState(1);
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState(false);
  // const [loggedinUser, setLoggedinUser] = useState<User | null>(null);
  const mutation = api.post.createUser.useMutation({
    onError: async () => {
      query
        .refetch()
        .then((loggedinUser) => {
          setLogin(login=>true)
          if (loggedinUser.data) {
            (userData.id = loggedinUser.data.id),
              (userData.username = loggedinUser.data.name);
            userData.level = loggedinUser.data.level;
            userData.points = loggedinUser.data.points;
            userData.pointsToReach = loggedinUser.data.pointsToReach;
            userData.email = loggedinUser.data.email;
          }
        })
        .catch((e) => {
          console.log("Error occured while fetching data");
        });
    },
    onSuccess: async (data) => {
      if (data) {
        userData.id = data.id,
        userData.username = data.name;
        userData.level = data.level;
        userData.points = data.points;
        userData.pointsToReach = data.pointsToReach;
        userData.email = data.email;
      }
      console.log("User created ", data);
    },
  });
  const query = api.post.getUser.useQuery(
    { email: email.length > 0 ? email : "" },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: false,
    },
  );
  useEffect(() => {
    if (user) {
      setEmail(`${user.emailAddresses[0]?.emailAddress}`);
      if (email.length > 0 && !login) {
        mutation.mutate({
          name: user.fullName ? user.fullName : "",
          email: email,
          level: 1,
          points: 0,
          pointsToReach: 10,
          labels: [],
          graphData: [],
        });
      }
    }
  }, [email, user]);

  const links = [
    {
      id: 1,
      label: "Dashboard",
      icon: <FaChartLine />,
      path: "/dashboard",
    },
    {
      id: 2,
      label: "Journal",
      icon: <FaJournalWhills />,
      path: "/journal",
    },
    {
      id: 3,
      label: "Friends",
      icon: <FaUserFriends />,
      path: "/friends",
    },
    {
      id: 4,
      label: "Compare",
      icon: <GiInjustice />,
      path: "/compare",
    },
  ];
  return (
    <>
      <div className="relative flex h-[90vh] w-[20vw] flex-col justify-start rounded-2xl border-8 border-white bg-gray-50 p-5 shadow-2xl">
        <div className="profile flex h-auto w-full items-center justify-between gap-10 rounded-2xl bg-gray-200 p-10 shadow-sm">
          {user ? (
            <>
              <div className="absolute z-[10] opacity-0">
                <UserButton afterSignOutUrl="/signin" />
              </div>
              <Image
                src={user ? user.imageUrl : ""}
                className="rounded-full border-4 border-white shadow-lg"
                width={60}
                height={60}
                alt="profile"
              />
              <div className="text-xl font-bold">{user?.fullName}</div>
            </>
          ) : (
            <>
              <div>Loading...</div>
            </>
          )}
        </div>
        <nav className="ml-5 mt-10 mt-4 flex flex-col gap-2">
          {links.map((link) => (
            <>
              <Link key={link.id} href={link.path}>
                {link.id == active ? (
                  <div
                    key={link.id}
                    className="flex w-full items-center justify-start gap-2 rounded-2xl bg-gray-200 pb-3 pl-5 pt-3 text-xl shadow-lg hover:cursor-pointer hover:bg-gray-200"
                  >
                    <div className="text-2xl">{link.icon}</div>
                    <div className="ml-3">{link.label}</div>
                  </div>
                ) : (
                  <div
                    key={link.id}
                    onClick={() => setActive(link.id)}
                    className="flex w-full items-center justify-start  rounded-2xl pb-3 pl-5 pt-3 text-xl hover:cursor-pointer hover:bg-gray-200"
                  >
                    <div className="text-2xl">{link.icon}</div>
                    <div className="ml-5">{link.label}</div>
                  </div>
                )}
              </Link>
            </>
          ))}
        </nav>
        {/* <div className=''>Sign Out</div> */}
      </div>
    </>
  );
};

export default Sidebar;
