import Category from "../interfaces/Category";
import Task from "../interfaces/Task";

const baseUrl = "http://localhost:8089/api/ToDoList";

class ApiServices {
  static createTask(newTask: {
    name: string;
    description: string;
    categoryId: number;
  }): Promise<Task> {
    return fetch(baseUrl + "/AddTask", {
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
    return fetch(baseUrl + "/UpdateTask", {
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
    return fetch(baseUrl + `/RemoveTask/${taskId}`, {
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
    return fetch(baseUrl + "/AddCategory", {
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

  static editCategory(editedCategory: Category) {
    return fetch(baseUrl + "/UpdateCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedCategory),
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

  static deleteCategory(categoryId: number) {
    return fetch(baseUrl + `/RemoveCategory/${categoryId}`, {
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
}
export default ApiServices;
