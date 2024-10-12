import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

export const prisma = new PrismaClient();
