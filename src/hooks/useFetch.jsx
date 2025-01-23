import { useEffect, useState } from "react";
import { fetchData } from "../util/api";

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    // setLoading(true);
    // setData("");
    // setErr(false);

    fetchData(url)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setErr("Something Went Wrong");
      });
  }, [url]);

  return { data, loading, err };
};

export default useFetch;
