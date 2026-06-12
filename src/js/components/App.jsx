import React, { useState } from "react";
import { TodoCard } from "./TodoCard";
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
    <div>
      <TodoCard>
        <TaskInput onAddTask={handleAddTask} />
        <TaskList tasks={tasks} onDelete={handleDeleteTask} />
      </TodoCard>
    </div>
  );
}
