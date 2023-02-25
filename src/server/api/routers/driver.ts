import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const driversRouter = createTRPCRouter({
  getQtyBonusByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      // 1. Get Driver Information with Vehicle Config
      const pDriver = await prisma.driver.findUnique({
        where: { id: driverId },
        include: { vehicleConfig: true },
      });
      // 1.1. Get Packages completed this month
      const pPackagesThisMonth = await prisma.parcel.findMany({
        where: {
          driverId: driverId,
          deliveryDate: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
          status: "DELIVERED",
        },
      });
      const [driver, packages] = await Promise.all([
        pDriver,
        pPackagesThisMonth,
      ]);

      if (!driver) throw new Error("Driver with this ID was not found");

      const { incentivePayStructure } = driver.vehicleConfig;
    }),
});
