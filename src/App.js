import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all"); // all, completed, pending
  const [successMessage, setSuccessMessage] = useState("");
  const [clearMessage, setClearMessage] = useState("");

  const addTask = (task) => {
    const newTasks = [...tasks, { id: Date.now(), text: task, completed: false }];
    setTasks(newTasks);

    // Exibir mensagem de sucesso
    setSuccessMessage("Tarefa adicionada com sucesso!");
    setTimeout(() => setSuccessMessage(""), 3000); // Ocultar mensagem após 3 segundos
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const clearAllTasks = () => {
    setTasks([]); // Limpa todas as tarefas
    localStorage.removeItem("tasks"); // Remove do Local Storage

    // Exibir mensagem de aviso
    setClearMessage("Todas as tarefas foram removidas!");
    setTimeout(() => setClearMessage(""), 3000); // Ocultar mensagem após 3 segundos
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <h1>Gerenciador de Tarefas</h1>
      <TaskInput onAddTask={addTask} />
      <div>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {clearMessage && <p style={{ color: "red" }}>{clearMessage}</p>}
      </div>
      <div>
        <button
          className={`filter ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          <i className="fas fa-list"></i> Todas
        </button>
        <button
          className={`filter ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          <i className="fas fa-clock"></i> Pendentes
        </button>
        <button
          className={`filter ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          <i className="fas fa-check"></i> Concluídas
        </button>
        <button className="clear-all" onClick={clearAllTasks}>
          Limpar Todas as Tarefas
        </button>

      </div>
      <TaskList tasks={filteredTasks} onToggleTask={toggleTask} onRemoveTask={removeTask} />
    </div>
  );
}

export default App;
