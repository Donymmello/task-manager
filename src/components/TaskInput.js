import React, { useState } from "react";

function TaskInput({ onAddTask }) {
  const [taskText, setTaskText] = useState("");
  const [category, setCategory] = useState("");

  const handleAddTask = () => {
    if (taskText.trim()) {
      onAddTask(taskText, category || "Sem Categoria");
      setTaskText("");
      setCategory(""); // Limpar campo de categoria após adicionar
    }
  };

  return (
    <div>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Digite a tarefa..."
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Categoria (opcional)"
      />
      <button onClick={handleAddTask}>Adicionar</button>
    </div>
  );
}

export default TaskInput;
