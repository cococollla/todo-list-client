import Task from "../interfaces/Task";
import BaseApiService from "./BaseApiService";

class TaskApiService extends BaseApiService {
  async createTask(newTask: {
    name: string;
    description: string;
    categoryId: number;
  }): Promise<Task> {
    return this.request("/AddTask", "POST", newTask);
  }

  async editTask(editedTask: Task) {
    return this.request("/UpdateTask", "POST", editedTask);
  }

  async deleteTask(taskId: number) {
    return this.request(`/RemoveTask/${taskId}`, "GET");
  }
}

export default TaskApiService;
