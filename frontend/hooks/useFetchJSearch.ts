import axios from "axios";
import { useState } from "react";

const useFetchJSearch = (endpoint, initialQuery = {}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(initialQuery);

  const fetchNextJob = async (customQuery) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.request({
        method: "GET",
        url: `https://${process.env.EXPO_PUBLIC_RAPID_API_HOST}/${endpoint}`,
        headers: {
          "X-RapidAPI-Key": process.env.EXPO_PUBLIC_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.EXPO_PUBLIC_RAPID_API_HOST,
        },
        params: {
          ...query,
          ...customQuery,
          num_pages: 1,
          page: page,
        },
      });
      if (
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        setData((prev) => [...prev, ...response.data.data]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setError(err);
      console.error("JSearch API Error:", err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = (newQuery = initialQuery) => {
    setData([]);
    setPage(1);
    setQuery(newQuery);
  };

  return { data, isLoading, error, fetchNextJob, reset, query };
};

export default useFetchJSearch;
