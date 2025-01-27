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
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [successMessage, setSuccessMessage] = useState("");
  const [clearMessage, setClearMessage] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Alterna entre claro e escuro
  };

  const addTask = (text, category) => {
    const newTask = {
      id: Date.now(),
      text,
      category,
      completed: false,
    };
    setTasks([...tasks, newTask]);

    // Exibir mensagem de sucesso
    setSuccessMessage("Tarefa adicionada com sucesso!");
    setTimeout(() => setSuccessMessage(""), 3000); // Ocultar mensagem após 3 segundos
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearAllTasks = () => {
    setTasks([]); // Limpa todas as tarefas
    localStorage.removeItem("tasks"); // Remove do Local Storage

    // Exibir mensagem de aviso
    setClearMessage("Todas as tarefas foram removidas!");
    setTimeout(() => setClearMessage(""), 3000); // Ocultar mensagem após 3 segundos
  };


  const filteredTasks = tasks.filter((task) => {
    if (filterCategory === "Todas") return true;
    return task.category === filterCategory;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <div className={isDarkMode ? "dark-theme" : "light-theme"}>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? "🌞 Claro" : "🌙 Escuro"}
        </button>

        <h1>Gerenciador de Tarefas</h1>
        <TaskInput onAddTask={addTask} />
        <div>
          <button onClick={() => setFilterCategory("Todas")}>Todas</button>
          {[...new Set(tasks.map((task) => task.category))].map((category, index) => (
            <button key={index} onClick={() => setFilterCategory(category)}>
              {category}
            </button>
          ))}
          <button onClick={clearAllTasks}>Limpar Todas as Tarefas
          </button>
        </div>
        <TaskList
          tasks={filteredTasks}
          onToggleTask={toggleTask}
          onRemoveTask={removeTask}
        />
      </div>
    </div>
  );
}

export default App;
