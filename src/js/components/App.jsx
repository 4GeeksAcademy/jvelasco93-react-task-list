import React, { useRef, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);

  function handleAddTask(description) {
    if (!description.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        description: description.trim(),
      },
    ]);
  }

  function handleDeleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <div className="container d-flex flex-column justify-content-start align-items-center mt-3">
      <div className="card shadow pb-2" style={{ width: "400px" }}>
        <div className="card-body">
          <h1
            className="text-center font-monospace m-0 mb-3 "
            style={{ fontSize: "5rem", letterSpacing: "-0.125em" }}
          >
            todo
          </h1>
          <div className="mb-3">
            <TaskInput onAddTask={handleAddTask} />
          </div>
          {tasks.length === 0 ? (
            <div className="alert alert-warning m-0 py-2">
              <small>No task, add a task</small>
            </div>
          ) : (
            <ul className="list-group">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask}
                />
              ))}
            </ul>
          )}
        </div>
        {tasks.length > 0 && (
          <div className="card-footer bg-transparent">
            <small className="text-secondary">
              {tasks.length} item{tasks.length !== 1 ? "s" : ""} left
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

function TaskInput({ onAddTask }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function submit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAddTask(trimmed);
    setValue("");

    inputRef.current.focus();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      submit();
    }
  }

  return (
    <div className="d-flex gap-1">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="form-control"
        placeholder="New task..."
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={submit}
      >
        Add
      </button>
    </div>
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
      >
        X
      </button>
    </li>
  );
}
