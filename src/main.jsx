import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

//Word ContextProvider
import WordsProvider from "./context/WordsContext";
import ThemeProvider from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <WordsProvider>
        <App />
      </WordsProvider>
    </ThemeProvider>
  </React.StrictMode>
);
