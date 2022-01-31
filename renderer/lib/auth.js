import { hashSync, compareSync } from "bcrypt";

export async function hashPassword(password) {
  const hashedPassword = await hashSync(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compareSync(password, hashedPassword);
  return isValid;
}
