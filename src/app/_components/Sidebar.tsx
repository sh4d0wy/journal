"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { FaChartLine, FaJournalWhills, FaUserFriends } from 'react-icons/fa'
import { GiInjustice } from "react-icons/gi";
import Link from 'next/link';
const Sidebar = () => {
    const [active,setActive] = useState(1);
    const links = [{
        id:1,
        label: "Home",
        icon:<FaChartLine/>,
        path:"/"
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
            <div className="profile w-full flex justify-between gap-10 items-center bg-gray-200 h-auto p-4 rounded-2xl">
                    <Image src="/image.jpg" className="rounded-full" width={50} height={50} alt="profile"/>
                    <div className='text-xl font-bold'>Saksham Bhugra</div>
            </div>
            <nav className='flex flex-col mt-10 ml-5 gap-2 mt-4'>
                {links.map((link)=>(
                    <>
                    <Link href={link.path}>
                    {link.id==active? 
                    <div key={link.id} className='flex text-xl hover:bg-gray-200 gap-2 hover:cursor-pointer bg-gray-200 w-full pt-3 pl-5 pb-3 rounded-2xl justify-start items-center'>
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