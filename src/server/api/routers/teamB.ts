import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const teamBRouter = createTRPCRouter({
    // axios.get("/users",{userId:"1234", name:"Abrar", teamId:"12345"})

    // const {userId,name,teamId} = res.body
    // let query = `select from tabvle 1 where ${id}   `

    // { userId:strring , name: string, teamId: string? , priority: HIGH|MEDIUM|LOW }
  
    insert: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
        teamId: z.string().optional(),
        priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
        dueDate: z.date().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: {
          ...input,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        dueDate: z.date().optional(),
        isComplete: z.boolean().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          DueDate: input.dueDate,
          isCompleted: input.isComplete,
        },
      });
    }),
  

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany();
  }),
  getFromSingleUser: protectedProcedure
    .input(z.object({ userid: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findMany({
        where: {
          userId: input.userid,
        },
      });
    }),


  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
