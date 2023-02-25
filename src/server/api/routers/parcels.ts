import { ParcelStatus } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import {
  getCompletedParcelsByDriverId,
  getNonCompletedParcelsByDriverId,
} from "../helpers/parcels.helpers";

export const parcelsRouter = createTRPCRouter({
  getNonCompletedByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      return await getNonCompletedParcelsByDriverId(driverId);
    }),
  getCompletedByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      return await getCompletedParcelsByDriverId(driverId);
    }),
  updateStatusByTrackingNumber: publicProcedure
    .input(
      z.object({
        trackingNumber: z.string(),
        status: z.nativeEnum(ParcelStatus),
      })
    )
    .mutation(async ({ input: { trackingNumber, status } }) => {
      const parcel = await prisma.parcel.update({
        where: { trackingNumber: trackingNumber },
        data: { status },
      });
      return parcel;
    }),
});
