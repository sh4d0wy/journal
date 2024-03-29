import { TRPCClientError } from "@trpc/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const postRouter = createTRPCRouter({
    createUser: publicProcedure
    .input(z.object({
      name:z.string(),
      email:z.string().email(),
      level:z.number(),
      points:z.number(),
      pointsToReach:z.number(),
      labels:z.array(z.date()),
      graphData:z.array(z.number())
    })
    )
    .mutation(async ({input})=>{
      let user;
      try{
        user = await db.user.create({
        data:{...input}
      })
      return user;
    }catch(e){
      console.log("Some error occured",e)
      throw new TRPCClientError("User exists");
    }
    }),

    getUser:publicProcedure
    .input(z.object({email:z.string()}))
    .query(async ({input})=>{
      const user = db.user.findFirst({
        where:{
          email:input.email
        }
      })
      return user;
    }),  

    updatePoints:publicProcedure
    .input(z.object({
      id:z.number(),
      type:z.string()
    })
    )
    .mutation(async({input})=>{
      let points;
      if(input.type==="task"){
        points = 1;
      }else{
        points = 2;
      }
      const user = await db.user.findFirst({
        where:{
          id:input.id
        }
      })
      if(user?.points){
        points = user?.points + points
      }
      if(user?.pointsToReach == points){
        try{
          await db.user.update({
            where:{
              id:input.id
            },
            data:{
              level:{increment:1},
              points:0,
              pointsToReach:{multiply:user?.level}
            }
          })
          return ({success:true,updated:"level"})
        }catch(e){
          console.log(e);
          throw new Error("Failed to update userdata");
        }
      }else{
        try{await db.user.update({
           where:{
             id:input.id
           },
           data:{
             points: 10
           }
         })
         return ({success:true,updated: "Points"});
       }catch(e){
         console.log(e);
         throw new TRPCClientError("Error updating points")
       }
      }
    })
});
       
