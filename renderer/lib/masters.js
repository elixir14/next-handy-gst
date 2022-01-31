import prisma from "./prisma";

export const cities = async () => {
  return await prisma.city.findMany();
};

export const states = async () => {
  return await prisma.state.findMany();
};
