import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';


export const appRouter = router({
  // test: publicProcedure.query(() => {
  //   return 'hello'
  // })

  authCallback: publicProcedure.query(async () => {
    const {getUser} = getKindeServerSession()
    const user = getUser()

    if(!user || !user.email)
      throw new TRPCError({code: 'UNAUTHORIZED'})

    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    })

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      })
    }
    // const dbUser = await db
    return {success: true}
  })
});
export type AppRouter = typeof appRouter;