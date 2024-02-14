  "use client"
  import React, { useState,useEffect } from 'react'
  import Image from 'next/image'
  import { FaChartLine, FaJournalWhills, FaUserFriends } from 'react-icons/fa'
  import { GiInjustice } from "react-icons/gi";
  import Link from 'next/link';
  import { UserButton, useUser } from '@clerk/nextjs';
  import { api } from '~/trpc/react';
  import { userData } from '../_utils/states';
  type User = {
      id:number,
      name:string,
      email:string,
      level:number,
      points:number,
      pointsToReach:number
    }

  const Sidebar = () => {
      const [active,setActive] = useState(1);
      const {user} = useUser();
      const [email,setEmail] = useState("");
      const [loggedinUser,setLoggedinUser] = useState<User | null>(null);
      const mutation = api.post.createUser.useMutation({
        onError:async()=>{
          query.refetch().then((data)=>{
            if(data.data){
              setLoggedinUser(loggedinUser=>data.data);

            }
          }).catch((e)=>{
            console.log("Error occured while fetching data");
          })
        },
        onSuccess:async (data)=>{
          console.log("User created ",data);
        }
      }
      )
      const query = api.post.getUser.useQuery({email:email.length>0?email:""},{
        refetchOnMount:false,
        refetchOnReconnect:false,
        refetchOnWindowFocus:false, 
        enabled:false,
      });
      useEffect(() => {
        if (user) {
          setEmail(`${user.emailAddresses[0]?.emailAddress}`);
          if (email.length > 0 && !loggedinUser) {
            mutation.mutate({
              name: user.fullName ? user.fullName : "",
              email: email,
              level: 1,
              points: 0,
              pointsToReach: 10,
              lables: [],
              graphData:[]
            })
            } 
        }
      }, [email, user]);

      if(loggedinUser){
        userData.username = loggedinUser.name;
        userData.level = loggedinUser.level;
        userData.points = loggedinUser.points;
        userData.pointsToReach = loggedinUser.pointsToReach;
      }
      const links = [{
          id:1,
          label: "Dashboard",
          icon:<FaChartLine/>,
          path:"/dashboard"
      },{
          id:2,
          label:'Journal',
          icon:<FaJournalWhills />,
          path:"/journal"
      },
      {
          id:3,
          label:"Friends",
          icon:<FaUserFriends />,
          path:"/friends"
      },
      {
          id:4,
          label:"Compare",
          icon:<GiInjustice/>,
          path:"/compare"
      }
  ]
    return (
      <>
          <div className="w-[20vw] h-[90vh] flex justify-start flex-col bg-gray-50 border-8 p-5 shadow-2xl border-white relative rounded-2xl">
              <div className="profile shadow-sm w-full flex justify-between gap-10 items-center bg-gray-200 h-auto p-10 rounded-2xl">
                  {user?
                  <>
                  <div className='absolute z-[10] opacity-0'>
                  <UserButton afterSignOutUrl="/signin"/>
                  </div>
                  <Image src={user?user.imageUrl:""} className="rounded-full border-4 border-white shadow-lg" width={60} height={60} alt="profile"/>
                  <div className='text-xl font-bold'>{user?.fullName}</div>
                  </>:
                  <>
                  <div>
                      Loading...
                  </div>
                  </>
                  }
              </div>
              <nav className='flex flex-col mt-10 ml-5 gap-2 mt-4'>
                  {links.map((link)=>(
                      <>
                      <Link key={link.id} href={link.path}>
                      {link.id==active? 
                      <div key={link.id} className='flex text-xl shadow-lg hover:bg-gray-200 gap-2 hover:cursor-pointer bg-gray-200 w-full pt-3 pl-5 pb-3 rounded-2xl justify-start items-center'>
                          <div className='text-2xl'>{link.icon}</div>
                          <div className='ml-3'>{link.label}</div>
                      </div>:
                      <div key={link.id} onClick={()=>setActive(link.id)} className='flex hover:cursor-pointer text-xl hover:bg-gray-200  w-full pt-3 pl-5 pb-3 rounded-2xl justify-start items-center'>
                          <div className='text-2xl'>{link.icon}</div>
                          <div className='ml-5'>{link.label}</div>
                      </div>
                      }
                      </Link> 
                      </>
                  ))}

              </nav>
              {/* <div className=''>Sign Out</div> */}
          </div>
      </>
    )
  }

  export default Sidebar