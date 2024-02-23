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
        await db.tasks.create({
          data: { ...input },
        });
        if(input.type==="normal"){
          await db.user.update({
            where:{
              id:input.userId
            },
            data:{
              points:{increment:1}
            }
          })
        }
        return {data:input};
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
