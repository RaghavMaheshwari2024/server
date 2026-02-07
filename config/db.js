import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

const $connect = () => prisma.$connect();

export default prisma;
export { $connect };
