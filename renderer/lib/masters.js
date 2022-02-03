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

export const processes = async () => {
  return await prisma.process.findMany();
};

export const suppliers = async () => {
  return await prisma.supplier.findMany();
};

export const transports = async () => {
  return await prisma.transport.findMany();
};

export const items = async () => {
  return await prisma.item.findMany();
};

export const outward_chalaan_item = async () => {
  return await prisma.outward_chalaan_item.findMany();
};
