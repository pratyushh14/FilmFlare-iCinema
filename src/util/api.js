import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const token = import.meta.env.VITE_APP_API_TOKEN;

const headers = {
  Authorization: "Bearer " + token,
};

export const fetchData = async (url, params) => {
  try {
    const data = await axios.get(baseUrl + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
