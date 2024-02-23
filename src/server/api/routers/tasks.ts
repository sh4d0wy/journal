import { TRPCClientError } from "@trpc/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const taskRouter = createTRPCRouter({
  addTask: publicProcedure
    .input(
      z.object({
        tasks: z.string(),
        doneAt: z.string(),
        type: z.string(),
        userId:z.number()
      }),
    )
    .mutation(async ({ input }) => {
      try {
        let points;
        const user = await db.user.findFirst({
          where:{
            id:input.userId
          }
        })
        await db.tasks.create({
          data: { ...input },
        });
        if(input.type=="task" && user){
          points = user?.points+1;
        }else if(input.type=="project" && user){
          points = user?.points+2;
        }
        
        if(user?.pointsToReach==points && user){
          try{
            await db.user.update({
              where:{
                id:input.userId
              },
              data:{
                level:{increment:1},
                points:0,
                pointsToReach:user?.pointsToReach*2
              }
            })
            return ({
              success:true,
              updated:"level"
            })
          }catch(err){
            console.log("Error in updating the user after adding a task \n",err)
          }
        }
       else{
          await db.user.update({
            where:{
              id:input.userId
            },
            data:{
              points:points
            }
          })
          return({sucess:true,updated:"points"})
        }
      } catch (e) {
        console.log(e);
        throw new TRPCClientError("Error occured");
      }
    }),

  getTasks: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const tasks = await db.tasks.findMany(
            {
                 where:  { 
                    userId: input?.id 
                }
             });
        return  tasks;
      } catch (err) {
        console.error(`Query Failed ${err}`);
      }
    }),
});
