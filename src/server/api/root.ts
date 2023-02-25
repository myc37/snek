import { createTRPCRouter } from "~/server/api/trpc";
import { packagesRouter } from "~/server/api/routers/packages";
import { questsRouter } from "./routers/quests";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  packages: packagesRouter,
  quests: questsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
