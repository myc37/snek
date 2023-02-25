import { prisma } from "~/server/db";

export const getDriverMinimumGoal = async (driverId: string) => {
  const driver = await prisma.driver.findUnique({
    where: { id: driverId },
    select: { minimumGoal: true },
  });

  if (driver?.minimumGoal) return driver.minimumGoal;

  const parcelsAssignedToDriver = await prisma.parcel.findMany({
    where: { driverId, assignedDate: new Date() },
  });
  return parcelsAssignedToDriver?.length ?? 0;
};
