import { forwardRef } from "react";
import useWords from "../hooks/useWords";

const Form = ({ input, handleInput, handleOnKeyUp }, ref) => {
  const { isLoading } = useWords();

  return (
    <div className="form">
      <input
        ref={ref}
        type="text"
        value={input}
        onKeyUp={handleOnKeyUp}
        onChange={handleInput}
        disabled={isLoading}
      />
    </div>
  );
};

export default forwardRef(Form);
