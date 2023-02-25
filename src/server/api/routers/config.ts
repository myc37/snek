import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "~/server/db";
import { z } from "zod";
import { Country } from "@prisma/client";

export const configsRouter = createTRPCRouter({
  getConfigByCountry: publicProcedure
    .input(z.object({ country: z.nativeEnum(Country) }))
    .query(async ({ input: { country } }) => {
      return await prisma.countryConf.findUnique({ where: { country } });
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
