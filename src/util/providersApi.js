import axios from "axios";

export const fetchProviderData = async (endpoint, mediaType, id) => {
  const options = {
    method: "GET",
    url: `https://streaming-availability.p.rapidapi.com/${endpoint}`,
    params: {
      output_language: "en",
      tmdb_id: `${mediaType}/${id}`,
    },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_APP_PROVIDER_API_ID,
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
