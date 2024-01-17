import { makeAutoObservable } from "mobx";
import Task from "../interfaces/Task";
import ApiServices from "../services/ApiServices";

class TaskStore {
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  async addTask(task: Task) {
    const newTask: Task = await ApiServices.createTask(task);
    if (newTask.id !== 0) {
      this.tasks.push(newTask);
    }
  }

  editTask(editedTask: Task) {
    ApiServices.editTask(editedTask).then(() => {
      this.tasks = this.tasks.map((task) =>
        task.id === editedTask.id ? { ...editedTask } : task
      );
    });
  }

  deleteTask(task: Task) {
    ApiServices.deleteTask(task.id);
    const deletedTasks = this.tasks.filter((t) => t.id !== task.id);
    this.setTasks(deletedTasks);
  }
}

export default new TaskStore();
