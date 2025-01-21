import React, { useState } from "react";

function TaskInput({ onAddTask }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      onAddTask(input);
      setInput("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nova tarefa..."
      />
      <button onClick={handleAdd}>Adicionar</button>
    </div>
  );
}

export default TaskInput;
