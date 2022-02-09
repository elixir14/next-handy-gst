import { hashPassword } from "lib/auth";

const password = async () => {
  return await hashPassword();
};

export const user = {
  username: "admin",
  first_name: "admin",
  last_name: "admin",
  phone: "1234567890",
  email: "admin@admin.com",
  code: "25",
  type: "administrator",
  password: password(),
};
