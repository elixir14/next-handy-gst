import prisma from "lib/prisma";

export default async function handler(req, res) {
  const { payload, gst_number } = req.body;
  const { model, id } = req.query;
  try {
    const data = await prisma(gst_number)[model.replace(/-/g, "_")].update({
      where: {
        id: parseInt(id),
      },
      data: payload,
    });
    res.status(200).json(data);
  } catch (e) {
    console.log("🚀 ~ file: signup.js ~ line 14 ~ handler ~ e", e);
    if (e instanceof prisma(gst_number).PrismaClientKnownRequestError) {
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
