import { Prisma } from "@prisma/client";
import prisma from "lib/prisma";

export default async function handler(req, res) {
  const payload = req.body;
  const { model } = req.query;

  if (model === "user") {
    const existingUser = await prisma[model.replace(/-/g, "_")].findUnique({
      where: {
        email: payload.email,
      },
    });
    if (existingUser) {
      res.status(422).json({ message: "User already exists with this email!" });
      return;
    }
  }

  try {
    await prisma[model.replace(/-/g, "_")].create({
      data: payload,
    });
    res.status(200);
  } catch (e) {
    console.log("🚀 ~ file: signup.js ~ line 14 ~ handler ~ e", e);
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
