import React from "react";

function TaskItem({ task, onToggleTask, onRemoveTask }) {
  return (
    <li>
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
        onClick={() => onToggleTask(task.id)}
      >
        {task.text}
      </span>
      <button onClick={() => onRemoveTask(task.id)}>Apagar</button>
    </li>
  );
}

export default TaskItem;
