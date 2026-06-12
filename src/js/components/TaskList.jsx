import React from "react";

export function TaskList({ tasks, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div>
        <small>No tasks yet — add one above</small>
      </div>
    );
  }

  return (
    <>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={onDelete} />
        ))}
      </ul>
      <div>
        <small>
          {tasks.length} item{tasks.length !== 1 ? "s" : ""} left
        </small>
      </div>
    </>
  );
}

function TaskItem({ task, onDelete }) {
  return (
    <li className="task-item">
      <span>{task.description}</span>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete "${task.description}"`}
      >
        ✕
      </button>
    </li>
  );
}
