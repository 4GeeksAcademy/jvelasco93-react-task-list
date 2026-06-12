import React, { useState } from "react";
import { TaskInput } from "./TaskInput";
import { TaskList } from "./TaskList";

const taskService = {
  addTask(description) {
    if (!description.trim()) return null;
    return {
      id: crypto.randomUUID(),
      description: description.trim(),
    };
  },

  deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
  },
};
export default function App() {
  const [tasks, setTasks] = useState([]);

  function handleAddTask(description) {
    const newTask = taskService.addTask(description);
    if (newTask) {
      setTasks((prev) => [...prev, newTask]);
    }
  }

  function handleDeleteTask(id) {
    setTasks(taskService.deleteTask(tasks, id));
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
