"use client";
import React from "react";
import Middle from "../_components/Middle";
import Image from "next/image";
import CircularProgress from "@mui/joy/CircularProgress";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  Filler,
  Title,
  Legend
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  Filler,
  Title,
  Legend
);
const page = () => {
  const options = {
    plugins: {
      responsive:true,
      legend: {
        display: true,
        font:{
          size:20
        },
        padding:{bottom:30}

      }
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
              src="/levels/level3.png"
              className="animate-float"
              width={70}
              height={70}
              alt="Level 1"
            />
            <div className="text-bold text-3xl font-bold">Level 1</div>
          </div>
          <div className="box flex h-[20vh] w-[20vw] items-center justify-center gap-5 rounded-2xl bg-white shadow-lg ">
            <div className="text-bold text-2xl font-bold">Total Points</div>
            <CircularProgress size="lg" sx={{
              fontSize:15,
              display:"flex",
              justifyContent:"center",
              alignItems:'center'
            }} determinate value={(7 / 10) * 100}>
              7 / 10
            </CircularProgress>
          </div>
        </div>
        <div className="chart box flex h-[50vh] w-[45vw] items-center justify-center rounded-2xl bg-white p-10 shadow-xl ">
          <Line
            data={{
              labels: ["01/02", "02/02", "03/02", "03/02"],
              datasets: [
                {
                  label:"No of Tasks",
                  data: [4, 8, 6, 7],
                  borderColor: "rgba(53, 162, 235, 1)",
                  pointBorderColor:'rgba(53, 162, 235, 1)',
                  pointRadius:5,
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
      <div className="recent box flex h-full w-[55vw] flex-col p-5 items-start justify-start">
        <div className="text-2xl font-bold">Recent</div> 
        <div className="h-auto w-full flex flex-col mt-5 gap-3">
          <div className="bg-white rounded-xl shadow-xl w-full h-20 p-5 flex justify-between items-center">
            <div className="font-bold text-md">01/02</div>
            <div className="font-bold text-md">Authentication</div>
          </div>
          <div className="bg-white rounded-xl shadow-xl w-full h-20 p-5 flex justify-between items-center">
            <div className="font-bold text-md">01/02</div>
            <div className="font-bold text-md">Authentication</div>
          </div>
          <div className="bg-white rounded-xl shadow-xl w-full h-20 p-5 flex justify-between items-center">
            <div className="font-bold text-md">01/02</div>
            <div className="font-bold text-md">Authentication</div>
          </div>
          <div className="bg-white rounded-xl shadow-xl w-full h-20 p-5 flex justify-between items-center">
            <div className="font-bold text-md">01/02</div>
            <div className="font-bold text-md">Authentication</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
