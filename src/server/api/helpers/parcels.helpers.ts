import { ParcelStatus } from "@prisma/client";
import { prisma } from "~/server/db";
import { getMonthRange } from "./date.helpers";

export const getCompletedParcelsByDriverId = async (driverId: string) => {
  const { start, end } = getMonthRange();

  return await prisma.parcel.findMany({
    where: {
      driverId,
      status: ParcelStatus.DELIVERED,
      deliveryDate: { gte: start, lt: end },
    },
  });
};

export const getNonCompletedParcelsByDriverId = async (driverId: string) => {
  const { start, end } = getMonthRange();

  return await prisma.parcel.findMany({
    where: {
      driverId,
      NOT: { status: ParcelStatus.DELIVERED },
      assignedDate: { gte: start, lt: end },
    },
  });
};
