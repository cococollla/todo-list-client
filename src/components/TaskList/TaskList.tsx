import { useState, useEffect } from "react";
import styles from "./TaskList.module.css";
import Task from "../../interfaces/Task";
import EditTask from "../Task/EditTask/EditTask";
import DeleteTask from "../Task/DeleteTask/DeleteTask";
import taskStore from "../Store/TaskStore";
import { observer } from "mobx-react-lite";

export const TaskList = observer(() => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
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

        taskStore.setTasks(sortedTasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error.message);
      });
  }, []);

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    taskStore.editTask(task);
    setEditModalOpen(false);
  };

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    setDeleteModalOpen(true);
  };

  const handleDeleteTask = (task: Task) => {
    taskStore.deleteTask(task);
    setDeleteModalOpen(false);
  };

  return (
    <>
      {taskStore.tasks.map((task) => (
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
});

export default TaskList;
