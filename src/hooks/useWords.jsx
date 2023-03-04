import { useContext } from "react";
import { WordsContext } from "../context/WordsContext";

const useWords = () => useContext(WordsContext);

export default useWords;
