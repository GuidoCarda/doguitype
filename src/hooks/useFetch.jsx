import { useState, useEffect, useRef, useReducer } from "react";

const initialState = {
  isLoading: true,
  error: undefined,
  data: undefined,
};

const fetchReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: action.payload };
    case "fetched":
      return { ...state, data: action.payload };
    case "error":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const useFetch = (url) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  //To prevent state update on component unmount
  const alreadyFetched = useRef(false);

  const fetchData = async (url) => {
    dispatch({ type: "loading", payload: true });
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();
      dispatch({ type: "fetched", payload: data });
    } catch (error) {
      dispatch({ type: "error", payload: error });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  useEffect(() => {
    if (!url) return;
    if (alreadyFetched.current) return;
    fetchData(url);

    return () => {
      alreadyFetched.current = true;
    };
  }, []);

  return state;
};

export default useFetch;
