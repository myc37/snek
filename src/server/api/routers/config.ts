import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "~/server/db";
import { z } from "zod";
import { Country } from "@prisma/client";

export const configsRouter = createTRPCRouter({
  getConfigByCountry: publicProcedure
    .input(z.object({ country: z.nativeEnum(Country) }))
    .query(async ({ input: { country } }) => {}),
});
