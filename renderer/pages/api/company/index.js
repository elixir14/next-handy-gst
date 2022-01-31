import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import { Prisma } from "@prisma/client";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  if (session) {
    const data = {
      ...req.body,
      customer_id: token.sub,
    };
    try {
      await prisma.company.create({
        data,
      });
      res.status(200);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === "P2002") {
          res.status(400).json({ error: "Email already registered" });
        }
      }
    }
  } else {
    res.status(401);
  }
  res.end();
}
