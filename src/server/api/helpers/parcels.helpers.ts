import { type ParcelStatus } from "@prisma/client";
import { prisma } from "~/server/db";

const getMonthRange = () => {
  const start = new Date();
  const end = new Date();

  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  end.setMonth(start.getMonth() + 1);
  end.setDate(1);
  end.setHours(0, 0, 0, 0);

  return { start, end };
};

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
