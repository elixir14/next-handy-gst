import { get } from "./api";
import prisma from "./prisma";

export const cities = async (schema) => {
  return await prisma(schema).city.findMany();
};

export const states = async (schema) => {
  return await prisma(schema).state.findMany();
};

export const itemGroups = async (schema) => {
  return await prisma(schema).group.findMany();
};

export const units = async (schema) => {
  return await prisma(schema).unit.findMany();
};

export const processes = async (schema) => {
  return await prisma(schema).process.findMany();
};

export const suppliers = async (schema) => {
  return await prisma(schema).supplier.findMany();
};

export const transports = async (schema) => {
  return await prisma(schema).transport.findMany();
};

export const items = async (schema) => {
  return await prisma(schema).item.findMany();
};

export const outward_chalaan_item = async (schema) => {
  return await prisma(schema).outward_chalaan_item.findMany();
};

export const settings = async (schema) => {
  return await prisma(schema).settings.findMany();
};

export const companies = async (schema) => {
  return await prisma(schema).company.findMany();
};

export async function getDataList(modal, gst_number) {
  return get(`/api/${modal}/get`, { gst_number });
}

export async function getById(modal, gst_number, id) {
  return get(`/api/${modal}/get/${id}`, { gst_number });
}
