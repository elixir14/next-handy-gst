import { PrismaClient } from "@prisma/client";

const prisma = (schema) => {
  let prisma;
  schema = schema || "public";
  const user = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;

  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: `postgresql://${user}:${password}@localhost:5432/next-handy-gst?schema=${schema}`,
        },
      },
    });
  } else {
    if (!global.prisma?._engine?.datasourceOverrides?.db?.includes(schema)) {
      global.prisma = new PrismaClient({
        datasources: {
          db: {
            url: `postgresql://${user}:${password}@localhost:5432/next-handy-gst?schema=${schema}`,
          },
        },
      });
    }
    prisma = global.prisma;
  }
  return prisma;
};

export default prisma;
