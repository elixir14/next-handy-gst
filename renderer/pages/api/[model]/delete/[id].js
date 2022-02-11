import prisma from "lib/prisma";

export default async function handler(req, res) {
  const { model, id } = req.query;
  try {
    await prisma()[model.replace(/-/g, "_")].delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200);
  } catch (e) {
    console.log("🚀 ~ file: signup.js ~ line 14 ~ handler ~ e", e);
    if (e instanceof prisma().PrismaClientKnownRequestError) {
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
