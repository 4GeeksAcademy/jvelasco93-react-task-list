import React, { useState } from "react";

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
    <>
      <h1>todo</h1>
      <TaskInput onAddTask={handleAddTask} />
      {tasks.length === 0 ? (
        <p>No task, add a task</p>
      ) : (
        <>
          <ul>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} />
            ))}
          </ul>
          <p>
            {tasks.length} item{tasks.length !== 1 ? "s" : ""} left
          </p>
        </>
      )}
    </>
  );
}

function TaskInput({ onAddTask }) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  function submit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAddTask(trimmed);
    setValue("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      submit();
    }
  }

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button type="button" onClick={submit} disabled>
        Add task
      </button>
    </>
  );
}

function TaskItem({ task, onDelete }) {
  return (
    <li className="task-item">
      <span>{task.description}</span>
      <button type="button" onClick={() => onDelete(task.id)}>
        X
      </button>
    </li>
  );
}
