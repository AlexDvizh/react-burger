import React, { useState } from "react";

function useForm<T extends { [key: string]: string }>(inputValues: T) {
  const [form, setForm] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((currentState) => {
      const newState = {
        ...currentState,
        [name]: value,
      };
      return newState;
    });
  };

  return { form, handleChange, setForm };
}

export default useForm;