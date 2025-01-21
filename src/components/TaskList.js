import React, { useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./TaskList.css";

const TaskList = ({ tasks, onToggleTask, onRemoveTask }) => {
  const nodeRefs = useRef({});

  return (
    <TransitionGroup>
      {tasks.map((task) => {
        if (!nodeRefs.current[task.id]) {
          nodeRefs.current[task.id] = React.createRef();
        }

        return (
          <CSSTransition
            key={task.id}
            timeout={300}
            classNames="task"
            nodeRef={nodeRefs.current[task.id]}
          >
            <div
              ref={nodeRefs.current[task.id]}
              className={`task ${task.completed ? "completed" : ""}`}
            >
              <span onClick={() => onToggleTask(task.id)}>{task.text}</span>
              <button onClick={() => onRemoveTask(task.id)}>
                <i className="fas fa-trash"></i> Remover
              </button>
            </div>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default TaskList;
