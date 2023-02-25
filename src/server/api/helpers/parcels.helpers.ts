import { type ParcelStatus } from "@prisma/client";
import { prisma } from "~/server/db";

export const getCompletedParcelsByDriverId = async (driverId: string) => {
  return await prisma.parcel.findMany({
    where: {
      driverId,
      status: "DELIVERED",
    },
  });
};

export const getNonCompletedParcelsByDriverId = async (driverId: string) => {
  return await prisma.parcel.findMany({
    where: {
      driverId,
      NOT: { status: "DELIVERED" },
    },
  });
};

export const updateParcelStatusByTrackingNumber = async (
  trackingNumber: string,
  status: ParcelStatus
) => {
  await prisma.parcel
    .update({
      where: { trackingNumber },
      data: { status },
    })
    .then(async (updatedParcel) => {
      const driver = await prisma.driver.findUnique({
        where: { id: updatedParcel.driverId },
      });
    });
};
