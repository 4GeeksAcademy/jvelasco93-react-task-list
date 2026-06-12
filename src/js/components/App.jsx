import React, { useState } from "react";
import { TaskInput } from "./TaskInput";
import { TaskList } from "./TaskList";

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
    <main>
      <header>
        <h1>todos</h1>
      </header>
      <section>
        <TaskInput onAddTask={handleAddTask} />
        <TaskList tasks={tasks} onDelete={handleDeleteTask} />
      </section>
    </main>
  );
}
