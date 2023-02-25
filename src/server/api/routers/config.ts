import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "~/server/db";
import { z } from "zod";
import { Country } from "@prisma/client";

export const configsRouter = createTRPCRouter({
  getConfigByCountry: publicProcedure
    .input(z.object({ country: z.nativeEnum(Country) }))
    .query(async ({ input: { country } }) => {
      return await prisma.countryConfig.findUnique({ where: { country } });
    }),
  putConfigByCountry: publicProcedure
    .input(
      z.object({
        country: z.nativeEnum(Country),
        isInfractionVisible: z.boolean(),
        infractionPayStructure: z.any(),
      })
    )
    .mutation(
      async ({
        input: { country, isInfractionVisible, infractionPayStructure },
      }) => {
        return await prisma.countryConfig.upsert({
          where: { country },
          update: { isInfractionVisible, infractionPayStructure },
          create: { isInfractionVisible, infractionPayStructure, country },
        });
      }
    ),
});
