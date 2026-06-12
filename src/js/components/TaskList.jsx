import React from "react";

export function TaskList({ tasks, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="alert alert-warning m-0 py-2">
        <small>No tasks yet — add one above</small>
      </div>
    );
  }

  return (
    <>
      <ul className="list-group">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={onDelete} />
        ))}
      </ul>
      <div className="card-footer bg-transparent border-0 px-0 pb-0 pt-2">
        <small className="text-secondary">
          {tasks.length} item{tasks.length !== 1 ? "s" : ""} left
        </small>
      </div>
    </>
  );
}

function TaskItem({ task, onDelete }) {
  return (
    <li className="task-item list-group-item d-flex align-items-center justify-content-between">
      <span className="me-auto">{task.description}</span>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="btn btn-outline-danger btn-sm"
        aria-label={`Delete "${task.description}"`}
      >
        ✕
      </button>
    </li>
  );
}
