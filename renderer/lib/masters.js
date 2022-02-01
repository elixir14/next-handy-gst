import prisma from "./prisma";

export const cities = async () => {
  return await prisma.city.findMany();
};

export const states = async () => {
  return await prisma.state.findMany();
};

export const itemGroups = async () => {
  return await prisma.group.findMany();
};

export const units = async () => {
  return await prisma.unit.findMany();
};
