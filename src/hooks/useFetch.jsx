import { useState, useEffect, useRef } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const alreadyFetched = useRef(null);

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (alreadyFetched.current) return;
    fetchData(url);

    return () => (alreadyFetched.current = true);
  }, []);

  const reFetch = (url) => {
    fetchData(url);
  };

  return { data, isLoading, error, reFetch };
};

export default useFetch;
