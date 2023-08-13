import { PrismaClient } from '@prisma/client';
export default defineEventHandler((event) => {
    const prisma = new PrismaClient();
    return {
        hello: 'dsadsa'
    }
})