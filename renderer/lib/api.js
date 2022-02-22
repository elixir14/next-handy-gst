import axios from "axios";

export async function get(path, params = {}) {
  const response = await axios({
    method: "get",
    url: `${path}`,
    params,
    responseType: "json",
  })
    .then((res) => res.data)
    .catch((e) => {
      return {
        hasError: true,
        ...e,
      };
    });
  return response;
}
