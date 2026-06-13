import { taskGateway } from "../gateways/taskGateway";
import { UserNotFoundError } from "../gateways/taskGateway";


function mapTodoItemToDto(item) {
  return {
    id: item.id,
    description: item.label,
  };
}

export const taskService = {
  async loadTasks(userName = undefined, options = {}) {
    try {
      const user = await taskGateway.getUserWithTodos(userName, options);
      return (user?.todos ?? []).map(mapTodoItemToDto);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        await taskGateway.createUser(userName);
        const user = await taskGateway.getUserWithTodos(userName, options);
        return (user?.todos ?? []).map(mapTodoItemToDto);
      }
      throw error; // ✅ relanza cualquier otro error
    }
  },

  async addTask(description) {
    const todo = await taskGateway.createTodo(description)
    return mapTodoItemToDto(todo)
  },

  async deleteTask(id) {
    await taskGateway.deleteTask(id)
  },

  async deleteAllTasks(tasks) {
    await Promise.all(tasks.map((task) => taskGateway.deleteTask(task.id)))
  }
};
