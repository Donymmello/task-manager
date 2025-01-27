import React from "react";

const TaskList = ({ tasks, onToggleTask, onRemoveTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            onClick={() => onToggleTask(task.id)}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.text}
          </span>
          <span style={{ marginLeft: "10px", fontStyle: "italic", color: "gray" }}>
            [{task.category}]
          </span>
          <button onClick={() => onRemoveTask(task.id)}>Remover</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
