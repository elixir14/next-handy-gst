export const allowOnlyNumber = (value) => {
  return value.replace(/[^0-9]/g, "");
};

export const fetcher = (url) => fetch(url).then((r) => r.json());
