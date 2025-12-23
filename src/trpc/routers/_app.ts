import { TRPCError } from "@trpc/server";
import prisma from "@/lib/db";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  testAi: baseProcedure.mutation(async () => {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Something went wrong",
    });

    return { success: true, message: "Job queued" };
  }),

  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),

  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    // await inngest.send({
    // name: "test/hello.world",
    //data: {
    //  email: "manoj@gmail.com",
    // },
    // });

    return prisma.workflow.create({
      data: {
        name: "test-workflow",
      },
    });
  }),
});

export type AppRouter = typeof appRouter;
