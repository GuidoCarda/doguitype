import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  return (
    <div className="App">
      <div className="text-container">
        <p className="input-text"> {input} </p>
        <p className="sample-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut minus rem
          nobis repudiandae optio quae sint accusamus voluptate a assumenda,
          illum ipsum iure cum sapiente? Dignissimos delectus doloremque
          exercitationem illo?
        </p>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}

export default App;
