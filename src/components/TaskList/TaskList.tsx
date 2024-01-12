import React, { useState, useEffect } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8089/api/ToDoList/GetTasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error.message);
      });
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.description} - Category: {task.categoryId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
