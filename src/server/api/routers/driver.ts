import { type PackageBonusType, type InfractionType } from "@prisma/client";
import { type } from "os";
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
      const incentivePayStructure = await prisma.incentivePayStructure.findMany(
        {
          where: { vehicleConfigId: driver.vehicleConfigId },
          orderBy: {
            targetPackages: "asc",
          },
        }
      );
      const bonusPayment = incentivePayStructure.reduce((prev, curr) => {
        return curr.targetPackages <= packages.length
          ? curr.bonusPayment
          : prev;
      }, 0);
      return bonusPayment;
    }),
  getInfractionsByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      const infractions = await prisma.infraction.findMany({
        where: {
          driverId,
          date: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      });

      const infractionTypes = infractions.map((infraction) => infraction.type);

      const infractionStructures = await prisma.infractionPayStructure.findMany(
        {
          where: { infractionType: { in: infractionTypes } },
        }
      );

      const infractionStructureMap: Record<InfractionType, number> =
        infractionStructures.reduce((obj, { infractionType, deduction }) => {
          return {
            ...obj,
            [infractionType]: deduction,
          };
        }, {} as Record<InfractionType, number>);

      const totalDeduction = infractions.reduce((prev, curr) => {
        return prev + infractionStructureMap[curr.type];
      }, 0);

      return totalDeduction;
    }),
  getTypeBonusByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      const driver = await prisma.driver.findUnique({
        where: { id: driverId },
        select: { vehicleConfig: true },
      });

      if (!driver) throw new Error("Vehicle does not have a configuration");

      const { vehicleConfig } = driver;

      const typeBonuses = await prisma.packageTypeBonusStructure.findMany({
        where: { vehicleConfigId: vehicleConfig.vehicleConfigId },
      });

      const bonuses = await Promise.all(
        typeBonuses.map(async ({ criteria, bonus, packageType }) => {
          if (packageType == "CASH_ON_DELIVERY") {
            const codPackages = await prisma.parcel.findMany({
              where: {
                driverId: driverId,
                status: "DELIVERED",
                type: "CASH_ON_DELIVERY",
                deliveryDate: {
                  gte: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    1
                  ),
                },
              },
            });
            return (codPackages.length / criteria) * bonus;
          } else if (packageType == "L_SIZE") {
            const lPackages = await prisma.parcel.findMany({
              where: {
                driverId: driverId,
                deliveryDate: {
                  gte: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    1
                  ),
                },
                size: "L",
                status: "DELIVERED",
              },
            });
            return (lPackages.length / criteria) * bonus;
          } else (packageType == "RETURN_PACKAGE") {
            const returnPackages = await prisma.parcel.findMany({
              where: {
                driverId: driverId,
                deliveryDate: {
                  gte: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    1
                  ),
                },
                type: "RETURN",
                status: "DELIVERED",
              },
            });
            return (returnPackages.length / criteria) * bonus;
          }
        })
      );
      return bonuses.reduce((prevSum, bonus) => prevSum + bonus)
    }),
});
