import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "~/server/db";
import { z } from "zod";
import {
  Country,
  type InfractionType,
  type VehicleConf,
  type VehicleType,
} from "@prisma/client";

export const configsRouter = createTRPCRouter({
  getConfigByCountry: publicProcedure
    .input(z.object({ country: z.nativeEnum(Country) }))
    .query(async ({ input: { country } }) => {
      const countryConfig = await prisma.countryConf.findUnique({
        where: { country },
        include: { infractionPayStructures: true },
      });

      if (!countryConfig) throw new Error("Country Config Does Not Exist");
      const { infractionPayStructures } = countryConfig;
      const infractionPayMap = infractionPayStructures.reduce((p, c) => {
        const { infractionType, deduction } = c;
        return {
          ...p,
          [infractionType]: deduction,
        };
      }, {} as Record<InfractionType, number>);

      const vehicleConfigs = await prisma.vehicleConf.findMany({
        where: { country: country },
        include: {
          incentivePayStructures: { orderBy: { targetPackages: "asc" } },
        },
      });

      const vehicleTypeToConfigMap: Record<
        VehicleType,
        VehicleConf & { incentivePayStructure: Record<number, number> }
      > = vehicleConfigs.reduce((prev, { incentivePayStructures, ...curr }) => {
        const incentivePayMap = incentivePayStructures.reduce((p, c) => {
          const { targetPackages, bonusPayment } = c;
          return { ...p, [targetPackages]: bonusPayment };
        }, {});

        return {
          ...prev,
          [curr.vehicleType]: {
            incentivePayStructure: incentivePayMap,
            ...curr,
          },
        };
      }, {} as Record<VehicleType, VehicleConf & { incentivePayStructure: Record<number, number> }>);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { infractionPayStructures: junk, ...rest } = countryConfig;
      return {
        ...rest,
        vehicleConfig: vehicleTypeToConfigMap,
        infractionPayStructure: infractionPayMap,
      };
    }),
  putConfigByCountry: publicProcedure
    .input(
      z.object({
        country: z.nativeEnum(Country),
        countryConfig: z.object({
          isInfractionVisible: z.boolean(),
          infractionPayStructure: z.any(),
        }),
      })
    )
    .mutation(async ({ input: { country, countryConfig } }) => {
      return await prisma.countryConf.upsert({
        where: { country },
        update: countryConfig,
        create: { ...countryConfig, country },
      });
    }),
});
