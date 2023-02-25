import { prisma } from "~/server/db";

export const getDriverMinimumGoal = async (driverId: string) => {
  const driver = await prisma.driver.findUnique({
    where: { id: driverId },
    select: { minimumGoal: true },
  });

  return driver?.minimumGoal ?? 0;
};
