import React, { useEffect, useState } from "react";
import { TaskInput } from "./TaskInput";
import { TaskList } from "./TaskList";
import { taskService } from "../services/taskService";

export default function App() {
  const [tasks, setTasks] = useState([]);

  async function loadTasks(signal) {
    try {
      const items = await taskService.loadTasks(undefined, { signal });
      setTasks(items);
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error("Error cargando tareas:", error.name);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    loadTasks(controller.signal);
    return () => controller.abort();
  }, []);

  async function handleAddTask(description) {
    await taskService.addTask(description);
    await loadTasks();
  }

  async function handleDeleteTask(id) {
    await taskService.deleteTask(id);
    await loadTasks();
  }

  async function handleDeleteAllTasks() {
    await taskService.deleteAllTasks(tasks);
    await loadTasks();
  }

  return (
    <main>
      <header>
        <h1>todos</h1>
      </header>
      <section>
        <TaskInput onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onDeleteAll={handleDeleteAllTasks}
        />
      </section>
    </main>
  );
}
