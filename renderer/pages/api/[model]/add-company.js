import prisma from "lib/prisma";
var child_process = require("child_process");

export default async function handler(req, res) {
  const payload = req.body;
  const { model } = req.query;

  const existingGST = await prisma("public")[
    model.replace(/-/g, "_")
  ].findUnique({
    where: {
      gst_number: payload.gst_number,
    },
  });
  if (existingGST) {
    res
      .status(422)
      .json({ message: "Company already register with this GST number" });
    return;
  }
  child_process.exec(`npm run schema:file --name=${payload.gst_number}`);

  try {
    const data = await prisma("public")[model.replace(/-/g, "_")].create({
      data: payload,
    });
    res.status(200).json(data);
  } catch (e) {
    console.log("🚀 ~ file: signup.js ~ line 14 ~ handler ~ e", e);
    if (e instanceof prisma("public").PrismaClientKnownRequestError) {
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
