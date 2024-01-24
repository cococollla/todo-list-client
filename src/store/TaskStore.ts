import { makeAutoObservable } from "mobx";
import Task from "../interfaces/Task";
import { TaskDto } from "../interfaces/TaskDto";
import TaskApiService from "../services/TaskApiService";

class TaskStore {
  taskApiService = new TaskApiService();
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  async addTask(task: TaskDto) {
    const newTask: Task = await this.taskApiService.createTask(task);
    if (newTask.id !== 0) {
      this.tasks.push(newTask);
      return newTask.id;
    }
    return undefined;
  }

  async editTask(editedTask: Task) {
    const resultUpdate: Task = await this.taskApiService.editTask(editedTask);
    if (resultUpdate.id === editedTask.id) {
      this.tasks = this.tasks.map((task) =>
        task.id === editedTask.id ? { ...editedTask } : task
      );
      return resultUpdate.id;
    }

    return undefined;
  }

  deleteTask(task: Task) {
    this.taskApiService.deleteTask(task.id);
    const deletedTasks = this.tasks.filter((t) => t.id !== task.id);
    this.setTasks(deletedTasks);
  }

  fetchTasks() {
    fetch("http://localhost:8089/api/ToDoList/GetTasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        return response.json();
      })
      .then((data) => {
        const sortedTasks = data
          .slice()
          .sort((a: { id: number }, b: { id: number }) => a.id - b.id);

        this.setTasks(sortedTasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error.message);
      });
  }
}

export default new TaskStore();
