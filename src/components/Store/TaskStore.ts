import { action, makeAutoObservable, observable } from "mobx";
import Task from "../../interfaces/Task";
import ApiServices from "../../services/ApiServices";

class TaskStore {
  @observable tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  addTask(task: Task) {
    ApiServices.createTask(task);
    this.tasks.push(task);
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

const taskStore = new TaskStore();
export default taskStore;
