import prisma from "lib/prisma";

export default async function handler(req, res) {
  const { model, gst_number, outward_chalaan_id } = req.query;
  let data = [];
  try {
    if (model === "outward_chalaan_item") {
      data = await prisma(gst_number)[model.replace(/-/g, "_")].findMany({
        orderBy: [
          {
            updated_at: "desc",
          },
        ],
        where: {
          outward_chalaan_id: parseInt(outward_chalaan_id),
        },
      });
    } else {
      data = await prisma(gst_number)[model.replace(/-/g, "_")].findMany({
        orderBy: [
          {
            updated_at: "desc",
          },
        ],
      });
    }
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
