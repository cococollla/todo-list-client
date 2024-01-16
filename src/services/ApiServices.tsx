import { error } from "console";
import Category from "../interfaces/Category";
import Task from "../interfaces/Task";

class ApiServices {
  static createTask(newTask: {
    name: string;
    description: string;
    categoryId: number;
  }): Promise<Task> {
    return fetch("http://localhost:8089/api/ToDoList/AddTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add task");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error creating task:", error.message);
      });
  }

  static editTask(editTask: Task) {
    return fetch("http://localhost:8089/api/ToDoList/UpdateTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to edit task");
        }
      })
      .catch((error) => {
        console.error("Error edit task:", error.message);
      });
  }

  static deleteTask(taskId: number) {
    return fetch(`http://localhost:8089/api/ToDoList/RemoveTask/${taskId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove task");
        }
      })
      .catch((error) => {
        console.error("Error removing task:", error.message);
      });
  }

  static createCategory(newCategory: {
    name: string;
    description: string;
  }): Promise<Category> {
    return fetch("http://localhost:8089/api/ToDoList/AddCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add category");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error creating task:", error.message);
      });
  }
}
export default ApiServices;
