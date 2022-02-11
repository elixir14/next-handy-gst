import { PrismaClient } from "@prisma/client";

const prisma = () => {
  let prisma;
  const schema = "public";
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
    if (!global.prisma && global.schema !== schema) {
      global.prisma = new PrismaClient({
        datasources: {
          db: {
            url: `postgresql://${user}:${password}@localhost:5432/next-handy-gst?schema=${schema}`,
          },
        },
      });
      global.schema = schema;
    }
    prisma = global.prisma;
  }
  return prisma;
};

export default prisma;

//https://www.prisma().io/docs/reference/api-reference/prisma-client-reference#datasources

// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: `mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//     },
//   },
// });
