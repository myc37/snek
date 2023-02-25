import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "~/server/db";
import { z } from "zod";
import { Country, type VehicleConf, type VehicleType } from "@prisma/client";

export const configsRouter = createTRPCRouter({
  getConfigByCountry: publicProcedure
    .input(z.object({ country: z.nativeEnum(Country) }))
    .query(async ({ input: { country } }) => {
      const countryConfig = await prisma.countryConf.findUnique({
        where: { country },
        include: { infractionPayStructures: true, quests: true },
      });

      const vehicleConfigs = await prisma.vehicleConf.findMany({
        where: { country: country },
        include: { incentivePayStructures: true },
      });

      const vehicleTypeToConfigMap: Record<VehicleType, VehicleConf> =
        vehicleConfigs.reduce((prev, curr) => {
          return { ...prev, [curr.vehicleType]: curr };
        }, {} as Record<VehicleType, VehicleConf>);

      return { ...countryConfig, vehicleConfig: vehicleTypeToConfigMap };
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
