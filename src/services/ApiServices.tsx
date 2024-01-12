class ApiServices {
  static createTask(newTask: {
    name: string;
    description: string;
    categoryId: number;
  }) {
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
      })
      .catch((error) => {
        console.error("Error creating task:", error.message);
      });
  }
}

export default ApiServices;
