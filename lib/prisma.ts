import {PrismaClient} from "@prisma/client";

const globalForPrisma = global as unknown as {prisma: PrismaClient};
const globalPrisma = globalForPrisma.prisma || new PrismaClient();
export const prisma = globalPrisma.prisma || new PrismaClient();
if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

