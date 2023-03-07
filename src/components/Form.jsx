import useWords from "../hooks/useWords";

const Form = ({ input, handleInput, handleOnKeyUp }) => {
  const { isLoading } = useWords();

  return (
    <div className="form">
      <input
        type="text"
        value={input}
        onKeyUp={handleOnKeyUp}
        onChange={handleInput}
        disabled={isLoading}
      />
    </div>
  );
};

export default Form;
