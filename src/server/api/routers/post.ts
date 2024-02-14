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
      lables:z.array(z.date()),
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


});
       

  // create: publicProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //       },
  //     });
  //   }),

  // getLatest: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //   });
  // }),
