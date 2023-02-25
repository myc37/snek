import { prisma } from "~/server/db";
import { getDateRange } from "./date.helpers";

export const getDriverMinimumGoal = async (driverId: string) => {
  const driver = await prisma.driver.findUnique({
    where: { id: driverId },
    select: { minimumGoal: true },
  });

  if (driver?.minimumGoal) return driver.minimumGoal;

  const { start, end } = getDateRange();
  const parcelsAssignedToDriver = await prisma.parcel.findMany({
    where: { driverId, assignedDate: { gte: start, lt: end } },
  });
  return parcelsAssignedToDriver?.length ?? 0;
};
