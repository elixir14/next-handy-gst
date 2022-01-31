import { Prisma } from "@prisma/client";
import { hashPassword } from "lib/auth";
import prisma from "lib/prisma";

export default async function handler(req, res) {
  const data = req.body;
  const hashedPassword = await hashPassword(data.password);
  try {
    await prisma.customer.create({
      data: { ...data, password: hashedPassword },
    });
    res.status(200);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        res
          .status(400)
          .json({ key: "email", message: "Email already registered" });
      }
    }
  }
  res.end();
}
