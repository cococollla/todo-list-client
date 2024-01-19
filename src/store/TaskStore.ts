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
