import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.group.create({
    data: {
      displayName: 'Default Group',
    },
  });
}

main()
  .then(() => {
    console.log('Database seeded');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });