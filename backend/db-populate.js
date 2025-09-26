const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient();

async function main() {
  await prisma.expense.deleteMany();

  const expenseData = [
    {
      id: 1,
      date: new Date("2025-01-16T00:00:00.000Z"),
      description: "Example expense #1 from Alice",
      payer: "Alice",
      amount: 25.5,
    },
    {
      id: 2,
      date: new Date("2025-01-15T00:00:00.000Z"),
      description: "Example expense #2 from Bob",
      payer: "Bob",
      amount: 35,
    },
    {
      id: 3,
      date: new Date("2025-01-15T00:00:00.000Z"),
      description: "Example expense #3 from Alice",
      payer: "Alice",
      amount: 2,
    },
  ];

  const expenses = await prisma.expense.createMany({
    data: expenseData,
  });

  console.log("Database has been populated with sample expenses:", expenses);

  const allExpenses = await prisma.expense.findMany();
  console.log("All expenses in the database:", allExpenses);
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
