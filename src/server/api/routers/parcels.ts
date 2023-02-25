import { ParcelStatus } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { getDriverMinimumGoal } from "../helpers/drivers.helpers";
import {
  getCompletedParcelsByDriverId,
  getNonCompletedParcelsByDriverId,
} from "../helpers/parcels.helpers";
import { getAllQuestInstancesForDriver } from "../helpers/quests.helpers";

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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: { status },
      });

      if (status !== "DELIVERED") return;

      const questInstances = await getAllQuestInstancesForDriver(
        parcel.driverId ?? ""
      );
      const minimumGoal = await getDriverMinimumGoal(parcel.driverId ?? "");

      for (const instance of questInstances) {
        if (instance.isCompleted) continue;

        const isRepeatableInstanceCompleted =
          instance.frequency === "REPEATABLE" &&
          (instance?.targetValue ?? 0) - (instance?.currentValue ?? 0) === 1;
        const isDailyInstanceCompleted =
          instance.frequency === "DAILY" &&
          (instance?.targetPercentage ?? 0) * minimumGoal -
            (instance?.currentValue ?? 0) ===
            1;

        const updatedInstance = await prisma.questInstance.update({
          where: { questInstanceId: instance.questInstanceId },
          data: {
            currentValue: { increment: 1 },
            isCompleted:
              isRepeatableInstanceCompleted || isDailyInstanceCompleted,
          },
        });
        if (isRepeatableInstanceCompleted) {
          await prisma.questInstance.create({
            data: {
              questId: updatedInstance.questId,
              driverId: parcel.driverId ?? "",
              isCompleted: false,
              date: new Date(),
            },
          });
        }
      }
    }),
});
