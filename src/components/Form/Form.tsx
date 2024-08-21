import { useEffect, useRef, useState } from "react";
import "./Form.scss";

interface FormProps {
  addTask: (inputValue: string) => Promise<void>;
}

function Form({ addTask }: FormProps) {
  const [inputValue, setInputValue] = useState("");

  const myInputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    const inputElem = myInputRef.current as HTMLInputElement;
    inputElem.focus();
  }, []);

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        addTask(inputValue);
        setInputValue("");
      }}
    >
      <input
        ref={myInputRef}
        type="text"
        className="form-item"
        placeholder="Ajouter une tâche"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
    </form>
  );
}

export default Form;
