import { createContext } from "react";

export const WordsContext = createContext(null);

const WordsProvider = ({ children }) => {
  return (
    <WordsContext.Provider value="este es un contexto muy bueno">
      {children}
    </WordsContext.Provider>
  );
};

export default WordsProvider;
