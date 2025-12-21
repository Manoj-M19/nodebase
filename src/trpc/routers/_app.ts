

import {  createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(( ctx) => {
    return prisma.user.findMany({
    
    });
  }),
  createWorkflow:protectedProcedure.mutation(()=> {
    return prisma.workflow.create({
      data:{
        name:"test-workflow"
      },
    })
  })

});
// export type definition of API
export type AppRouter = typeof appRouter;