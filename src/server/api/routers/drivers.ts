import { type PackageBonusType, type InfractionType } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { getDriverMinimumGoal } from "../helpers/drivers.helpers";

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
      const driver = await prisma.driver.findUnique({
        where: { id: driverId },
      });
      if (!driver) throw new Error("Driver does not exist");

      const infractions = await prisma.infraction.findMany({
        where: {
          driverId,
          date: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      });

      const { country } = driver;

      const infractionStructures = await prisma.infractionPayStructure.findMany(
        {
          where: {
            countryConf: { country: country },
          },
        }
      );

      const infractionTotals: [number, InfractionType, number, number][] =
        infractionStructures.map(({ infractionType, deduction }) => {
          const infractionsOfType = infractions.filter(
            (infraction) => infractionType == infraction.type
          );
          const deductedForInfraction = infractionsOfType.length * deduction;
          return [
            infractionsOfType.length,
            infractionType,
            deduction,
            deductedForInfraction,
          ];
        });
      const infractionResult = infractionTotals.reduce((prev, curr) => {
        return prev + curr[3];
      }, 0);
      return {
        infractionsArray: infractionTotals,
        infractionTotal: infractionResult,
      };
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

      const bonuses: [number, PackageBonusType, number, number][] =
        await Promise.all(
          typeBonuses.map(async ({ bonus, packageType }) => {
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
              const total: number = codPackages.length * bonus;
              return [codPackages.length, packageType, bonus, total];
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
              const total = lPackages.length * bonus;
              return [lPackages.length, packageType, bonus, total];
            } else {
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
              const total = returnPackages.length * bonus;
              return [returnPackages.length, packageType, bonus, total];
            }
          })
        );

      const bonusesTotal = bonuses.reduce((prev, curr) => {
        return prev + curr[3];
      }, 0);
      return { bonusesArray: bonuses, bonusesTotal };
    }),
  getMinimumGoalByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      return getDriverMinimumGoal(driverId);
    }),
});
