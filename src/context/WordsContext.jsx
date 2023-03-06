import { createContext, useEffect, useRef, useState } from "react";
import { API_URL } from "../constants";

export const WordsContext = createContext(null);

const WordsProvider = ({ children }) => {
  const [words, setWords] = useState(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const alreadyFetched = useRef(null);

  const fetchWords = async (qty = 200) => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL + `?number=${qty}`);
      const words = await res.json();

      const wordsMap = words.reduce((map, word, index) => {
        map.set(index, word);
        return map;
      }, new Map());

      setWords(wordsMap);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (alreadyFetched.current) return;
    fetchWords();

    return () => (alreadyFetched.current = true);
  }, []);

  const getWords = (qty) => {
    fetchWords(qty);
  };

  const updateWords = (wordsMap) => setWords(wordsMap);

  return (
    <WordsContext.Provider
      value={{ words, isLoading, error, getWords, updateWords }}
    >
      {children}
    </WordsContext.Provider>
  );
};

export default WordsProvider;
