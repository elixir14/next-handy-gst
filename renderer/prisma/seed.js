const { default: prisma } = require("lib/prisma");
const { user } = require("./seedData");

async function main() {
  await prisma.user.create({
    data: user,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
