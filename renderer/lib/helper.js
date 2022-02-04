export const allowOnlyNumber = (value) => {
  return value.replace(/[^0-9]/g, "");
};
