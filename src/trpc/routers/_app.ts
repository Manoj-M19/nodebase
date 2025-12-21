

import { inngest } from '@/inngest/client';
import {  createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(( ctx) => {
    return prisma.user.findMany({});
  }),
    getWorkflows: protectedProcedure.query(() => {
    return prisma.workflow.findMany();}),

  createWorkflow:protectedProcedure.mutation( async ()=> {
    await inngest.send({
      name:"test/hello.world",
      data:{
        email:"manoj@gmail.com",
      }
    })

    return prisma.workflow.create({
      data:{
        name:"test-workflow"
      },
    })
  })

});

export type AppRouter = typeof appRouter;