import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Auth from "./Auth";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Recupera o tema do Local Storage ao carregar
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true";
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("isDarkMode", newTheme); // Salva a preferência no Local Storage
  };

  // Buscar tarefas do Firestore
  const fetchTasks = async () => {
    if (!user) return; // Verificar se o usuário está autenticado
    const querySnapshot = await getDocs(collection(db, `users/${user.uid}/tasks`));
    const userTasks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTasks(userTasks);
  };

  // Adicionar tarefa no Firestore
  const addTask = async (text, category) => {
    if (!user) return;
    const newTask = { text, category: category || "Sem Categoria", completed: false };
    const docRef = await addDoc(collection(db, `users/${user.uid}/tasks`), newTask);
    setTasks([...tasks, { id: docRef.id, ...newTask }]);
  };

  // Alternar estado da tarefa (completo/não completo)
  const toggleTask = async (id) => {
    const taskRef = doc(db, `users/${user.uid}/tasks`, id);
    const task = tasks.find((task) => task.id === id);
    await updateDoc(taskRef, { completed: !task.completed });
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // Remover tarefa do Firestore
  const removeTask = async (id) => {
    const taskRef = doc(db, `users/${user.uid}/tasks`, id);
    await deleteDoc(taskRef);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filtrar tarefas por categoria
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Todas") return true;
    if (filter === "Pendentes") return !task.completed;
    if (filter === "Concluídas") return task.completed;
    return task.category === filter;
  });

  // Atualiza as tarefas ao alterar o usuário
  useEffect(() => {
    fetchTasks();
  }, [user]);

  if (!user) {
    return <Auth onLogin={(user) => setUser(user)} />;
  }

  return (
    <div className={isDarkMode ? "dark-theme" : "light-theme"}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "🌞 Claro" : "🌙 Escuro"}
      </button>

      <h1>Gerenciador de Tarefas</h1>
      <button onClick={() => auth.signOut().then(() => setUser(null))}>Logout</button>

      {/* Input e Lista de Tarefas */}
      <TaskInput onAddTask={addTask} />
      <div>
        <button onClick={() => setFilter("Todas")}>Todas</button>
        <button onClick={() => setFilter("Pendentes")}>Pendentes</button>
        <button onClick={() => setFilter("Concluídas")}>Concluídas</button>
        {[...new Set(tasks.map((task) => task.category))].map((category, index) => (
          <button key={index} onClick={() => setFilter(category)}>
            {category}
          </button>
        ))}
      </div>
      <TaskList
        tasks={filteredTasks}
        onToggleTask={toggleTask}
        onRemoveTask={removeTask}
      />
    </div>
  );
}

export default App;
