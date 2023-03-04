import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

//Word ContextProvider
import WordsProvider from "./context/WordsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WordsProvider>
      <App />
    </WordsProvider>
  </React.StrictMode>
);
