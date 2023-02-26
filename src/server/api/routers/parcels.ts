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

      if (status !== ParcelStatus.DELIVERED) return parcel;

      const questInstances = await prisma.questProgression.findMany({
        where: {
          driverId: parcel.driverId as string,
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
        },
        include: { quest: true },
      });

      const promises = questInstances
        .filter(
          (instance) =>
            instance.currentProgression !== instance.quest.goldReward &&
            (instance.quest.title !== "Enthu Ninja" ||
              [0, 6].includes(new Date().getDay()))
        )
        .map((instance) =>
          prisma.questProgression.update({
            where: {
              questId_driverId_month_year: {
                questId: instance.questId,
                driverId: instance.driverId,
                month: instance.month,
                year: instance.year,
              },
            },
            data: { currentProgression: { increment: 1 } },
          })
        );

      await Promise.all(promises);

      return parcel;
    }),
});
