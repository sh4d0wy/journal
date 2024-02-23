"use client";
import React, { useEffect, useState } from "react";
import Middle from "../_components/Middle";
import Image from "next/image";
import CircularProgress from "@mui/joy/CircularProgress";
import { Line } from "react-chartjs-2";
import { useSnapshot } from "valtio";
import { userData } from "../_utils/states";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  Filler,
  Title,
  Legend,
} from "chart.js";
import { api } from "~/trpc/react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  Filler,
  Title,
  Legend,
);

interface tasksData{
  tasks:String,
  type:String,
  doneAt:String,
  userId:number
}
type tasks = tasksData[];

const page = () => {
  const snap = useSnapshot(userData);
  const [queryData,setQueryData] = useState<tasks>([]);
  const query = api.task.getTasks.useQuery({ id: snap.id },{
    refetchOnMount:false,
    refetchOnReconnect:false,
    enabled:false,
    refetchOnWindowFocus:false,
  });
  
  useEffect(()=>{
    if(snap.id>0){
      query.refetch().then((data)=>{
        if(data.data){
          setQueryData(data.data);
        }
      });
    }
  },[snap.id])


  const options = {
      plugins: {
      responsive: true,
      legend: {
        display: true,
        font: {
          size: 20,
        },
        padding: { bottom: 30 },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#5B5075", // Change the x-axis labels color to light blue
        },
      },
      y: {
        ticks: {
          color: "#5B5075", // Change the y-axis labels color to light blue
        },
      },
    },
  };

  return (
    <div className="relative flex h-[90vh] w-[70vw] items-center justify-center gap-5 rounded-2xl border-8 border-white bg-gray-50 px-5 py-10 shadow-2xl">
      <div>
        <div className="mb-10 flex gap-10">
          <div className="box flex h-[20vh] w-[20vw] items-center justify-center gap-3 rounded-2xl bg-white px-5 shadow-lg ">
            <Image
              src={"/levels/level" + snap.level + ".png"}
              className="animate-float"
              width={70}
              height={70}
              alt="Level 1"
            />
            <div className="text-bold text-3xl font-bold">
              Level {snap.level}
            </div>
          </div>
          <div className="box flex h-[20vh] w-[20vw] items-center justify-center gap-5 rounded-2xl bg-white shadow-lg ">
            <div className="text-bold text-2xl font-bold">Total Points</div>
            <CircularProgress
              size="lg"
              sx={{
                fontSize: 12,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              determinate
              value={(snap.points / snap.pointsToReach) * 100}
            >
              {snap.points} / {snap.pointsToReach}
            </CircularProgress>
          </div>
        </div>
        <div className="chart box flex h-[50vh] w-[45vw] items-center justify-center rounded-2xl bg-white p-10 shadow-xl ">
          <Line
            data={{
              labels: userData.lables,
              datasets: [
                {
                  label: "No of Tasks",
                  data: snap.graphData,
                  borderColor: "rgba(53, 162, 235, 1)",
                  pointBorderColor: "rgba(53, 162, 235, 1)",
                  pointRadius: 5,
                  pointBackgroundColor: "rgba(53, 162, 235, 0.5)", // Change the pointer color to light blue
                  tension: 0.4,
                  pointHoverRadius: 12, // Add this line to make the line curve
                  // Add this line to fill the area beneath the line
                  backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0.1, "rgba(53, 162, 235, 0.3)");
                    gradient.addColorStop(1, "rgba(53, 162, 235, 0)");
                    return gradient;
                  },
                  fill: true, // Add this line to fill the area beneath the line
                },
              ],
            }}
            options={options}
          />
        </div>
      </div>
        
     
      <div className="recent box flex h-full w-[55vw] flex-col items-start justify-start p-5">
    <div className="text-2xl font-bold">Recent</div>
    {queryData.length > 0 ? (
      <>
        {queryData.slice(-5,queryData.length).reverse().map((item,index) => (
          <div className="mt-5 flex h-auto w-full flex-col gap-3 " key={index}>
            <div className="flex h-20 w-full items-center justify-between px-20 rounded-xl bg-white py-5 shadow-xl">
              <div className="text-lg font-bold">{item.doneAt || 'date not found'}</div>
              <div className="text-lg font-bold">{item.tasks || 'name not found'}</div>
            </div>
          </div>
        ))}
      </>
    ) : (
      <div>Loading...</div> // Add loading state while data is being fetched
    )}
  </div>
        </div>
      
  );
};

export default page;
