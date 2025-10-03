const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional - remove if you want to keep existing data)
  await prisma.expense.deleteMany();
  
  // Create the expense data
  const expenseData = [
    { date: new Date("2025-01-16"), description: "Example expense #1 from Alice", payer: "Alice", amount: 25.5 },
    { date: new Date("2025-01-15"), description: "Example expense #2 from Bob", payer: "Bob", amount: 35 },
    { date: new Date("2025-01-15"), description: "Example expense #3 from Alice", payer: "Alice", amount: 2 }
  ];

  const expenses = await prisma.expense.createMany({
    data: expenseData
  });
  
  console.log(`Created ${expenses.count} expenses`);
  
  // Optionally, fetch and display the created expenses
  const allExpenses = await prisma.expense.findMany();
  console.log('All expenses:', allExpenses);
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });