import React from "react";

export function TaskList({ tasks, onDelete }) {
  if (tasks.length === 0) {
    return <p>No tasks yet — add one above</p>;
  }

  return (
    <section>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={onDelete} />
        ))}
      </ul>
      <small>
        {tasks.length} item{tasks.length !== 1 ? "s" : ""} left
      </small>
    </section>
  );
}

function TaskItem({ task, onDelete }) {
  return (
    <li className="task-item">
      {task.description}
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
