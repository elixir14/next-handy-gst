const { PrismaClient } = require(".prisma/client");

async function main() {
  prisma = new PrismaClient();
  await prisma.user.create({
    data: {
      username: "admin",
      first_name: "admin",
      last_name: "admin",
      phone: "1234567890",
      email: "admin@admin.com",
      code: "25",
      type: "administrator",
      password: "$2a$12$8DhyGUPa1YYWMxVeyGN/6e2uB2iYRJlaWsKpqSurfXfw5xck2NQRy",
    },
  });
}

main()
  .catch((e) => {
    console.error("ERROR==>", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
