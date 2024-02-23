"use client"
import React, { useEffect, useState } from 'react'
import Middle from '../_components/Middle';
import { useSnapshot } from 'valtio';
import {userData} from "../_utils/states"
import { api } from '~/trpc/react';

interface tasksData{
  tasks:String,
  type:String,
  doneAt:String,
  userId:number
}
interface tasks{
  data : tasksData[]
}
const page =() => {
  const snap = useSnapshot(userData);
  const [data,setData] = useState({
    tasks:"",
    type:"",
    date:1
  })
  const userQuery = api.post.getUser.useQuery({email:snap.email},{
    enabled:false,
    refetchOnMount:false,
    refetchOnReconnect:false,
    refetchOnWindowFocus:false
  })
  const mutation = api.task.addTask.useMutation({
    onSuccess:((data)=>{
      alert("Task added successfully");
      userQuery.refetch().then((data)=>{
        if(data.data){
          userData.points = data.data.points;
          userData.level = data.data.level;
          userData.pointsToReach = data.data.pointsToReach;
        }
      })
      if(data?.updated=="level"){
        alert("Congratulations Level upgraded");
      }
      query.refetch().then((tasks)=>{
        if(tasks.data){
          setApiData({data:tasks.data});
        }
      })
    }),
    onError:(()=>{
      alert("Error creating task")
    })
  }); 
  const query = api.task.getTasks.useQuery({id:snap.id},{
    refetchOnMount:false,
    refetchOnReconnect:false,
    refetchOnWindowFocus:false,
    enabled:false,
  })

  const handleTask = ()=>{
    mutation.mutate({
      tasks:data.tasks,
      type:data.type,
      doneAt:(new Date(Date.now()).getDate()+"/"+new Date(Date.now()).getMonth()),
      userId:snap.id
    })
  }
  const [apidata,setApiData] = useState<tasks|null>(null);
  
  useEffect(()=>{
    if(snap.id>0) {
      query.refetch().then((arr)=>{
        if(arr.data){
          setApiData({data:arr.data})
         
        }
      });       
    }
  },[snap.id]);
  console.log(snap.points);
  return (
    <div className="relative h-[90vh] w-[70vw] rounded-2xl border-8 border-white bg-gray-50 shadow-2xl">
      <div className='flex flex-col items-center gap-4 justify-start pt-16 pb-4'>
        <label>task</label>
        <input type='text' placeholder='enter task' onChange={(e)=>{
          setData({
            ...data,
            tasks:e.target.value
          })
        }}/>
        <label>Type</label>
        <input type='text' placeholder='enter Type' onChange={(e)=>{
          setData({
            ...data,
            type:e.target.value
          })
        }}/>
        <label>Date</label>
        <input type='date' placeholder='enter date' onChange={(e)=>{
          setData({
            ...data,
            // date:e.target.value
          })
        }}/>
        <button onClick={handleTask}>Add Task</button>
        </div>
        {apidata&&
          <>
            <div>
              {apidata?.data.slice(0).reverse().map((item,index)=>(
                 <p className='text-lg text-red-500'>{item.tasks}</p>
              ))}
            </div>
          </>
        } 
    </div>
  )
}

export default page;