import React, { useState, useRef } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);

  function handleAddTask(description) {
    if (!description.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), description: description.trim() },
    ]);
  }

  function handleDeleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <div className="container d-flex flex-column align-items-center mt-3">
      <TodoCard>
        <TaskInput onAddTask={handleAddTask} />
        <TaskList tasks={tasks} onDelete={handleDeleteTask} />
      </TodoCard>
    </div>
  );
}

function TodoCard({ children }) {
  return (
    <div className="card shadow pb-2" style={{ width: "400px" }}>
      <div className="card-body">
        <h1
          className="text-center font-monospace m-0 mb-3"
          style={{ fontSize: "5rem", letterSpacing: "-0.125em" }}
        >
          todo
        </h1>
        {children}
      </div>
    </div>
  );
}

function TaskInput({ onAddTask }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const isEmpty = value.trim() === "";

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") submit();
  }

  function submit() {
    if (isEmpty) return;
    onAddTask(value.trim());
    setValue("");
    inputRef.current.focus();
  }

  return (
    <div className="d-flex gap-2 mb-3">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="form-control text-input"
        placeholder="New task..."
        autoFocus
      />
      <button
        type="button"
        onClick={submit}
        disabled={isEmpty}
        className="btn btn-outline-secondary"
      >
        Add
      </button>
    </div>
  );
}

function TaskList({ tasks, onDelete }) {
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
    <li className="list-group-item d-flex align-items-center justify-content-between">
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
