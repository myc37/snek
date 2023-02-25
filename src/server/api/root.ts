import { createTRPCRouter } from "~/server/api/trpc";
import { parcelsRouter } from "~/server/api/routers/parcels";
import { questsRouter } from "./routers/quests";
import { driversRouter as driverRouter } from "./routers/driver";
import { driversRouter } from "./routers/drivers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  parcels: parcelsRouter,
  quests: questsRouter,
  driver: driverRouter,
  drivers: driversRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
