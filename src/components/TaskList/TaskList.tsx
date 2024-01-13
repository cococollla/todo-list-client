import React, { useState, useEffect, FC } from "react";
import styles from "./TaskList.module.css";
import Task from "../../interfaces/Task";
import EditTask from "../Task/EditTask/EditTask";
import ApiServices from "../../services/ApiServices";
import DeleteTask from "../Task/DeleteTask/DeleteTask";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTAsk] = useState<Task | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
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

        setTasks(sortedTasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error.message);
      });
  }, []);

  const handleEditClick = (task: Task) => {
    setSelectedTAsk(task);
    setEditModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    ApiServices.editTask(task)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((prevTask) =>
            prevTask.id === task.id ? { ...task } : prevTask
          )
        );
        setEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Error editing task:", error.message);
      });
  };

  const handleDeleteClick = (task: Task) => {
    setSelectedTAsk(task);
    setDeleteModalOpen(true);
  };

  const handleDeleteTask = (task: Task) => {
    ApiServices.deleteTask(task.id);
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
    setDeleteModalOpen(false);
  };

  return (
    <>
      {tasks.map((task) => (
        <div key={task.id.toString()} className={styles.item_todo}>
          <div className={styles.todo_content}>
            <div className={styles.todoTitle}>{task.name}</div>
            <div className={styles.todo_content}>{task.description}</div>
          </div>
          <div className={styles.button_container}>
            <button
              className={styles.edit_button}
              onClick={() => handleEditClick(task)}
            >
              Изменить
            </button>
            <button
              className={styles.delete_button}
              onClick={() => handleDeleteClick(task)}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}

      {selectedTask && (
        <EditTask
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          task={selectedTask}
          onEditTask={handleEditTask}
        />
      )}
      {selectedTask && (
        <DeleteTask
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          task={selectedTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </>
  );
};

export default TaskList;
