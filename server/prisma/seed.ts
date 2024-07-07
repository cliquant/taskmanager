import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.permission.createMany({
    data: [
      { name: "VIEW_USERS", category: "group" },
      { name: "MANAGE_USERS", category: "group" },
      { name: "DO_TASKS", category: "group" },
      { name: "ADD_ASSIGNEES", category: "project" },
      { name: "REMOVE_ASSIGNEES", category: "project" },
      { name: "RENAME_PROJECT", category: "project" },
      { name: "DELETE_PROJECT", category: "project" },
      { name: "RENAME_TASK", category: "task" },
      { name: "ADD_ASSIGNEES", category: "task" },
      { name: "REMOVE_ASSIGNEES", category: "task" },
      { name: "COMMENT", category: "task" },
      { name: "DELETE_TASK", category: "task" }
    ],
    skipDuplicates: true
  });

  await prisma.group.create({
    data: {
      displayName: "Employee",
      permissions: {
        connect: [
          { name_category: { name: "DO_TASKS", category: "group" } }
        ]
      }
    }
  });

  await prisma.group.create({
    data: {
      displayName: "Admin",
      permissions: {
        connect: [
          { name_category: { name: "VIEW_USERS", category: "group" } },
          { name_category: { name: "MANAGE_USERS", category: "group" } },
          { name_category: { name: "DO_TASKS", category: "group" } }
        ]
      }
    }
  });

  await prisma.taskStatus.createMany({
    data: [
      { name: "FINISHED" },
      { name: "CANCELED" },
      { name: "TODO" },
      { name: "IN_PROGRESS" }
    ],
    skipDuplicates: true
  });

  console.log("Seeding completed.");
}

main()
  .catch(e => {
    console.error("Error during seeding: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });