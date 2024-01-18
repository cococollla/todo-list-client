import { useState, useEffect, useCallback } from "react";
import styles from "./TaskList.module.css";
import Task from "../../interfaces/Task";
import EditTask from "../Task/EditTask/EditTask";
import DeleteTask from "../Task/DeleteTask/DeleteTask";
import taskStore from "../../store/TaskStore";
import { observer } from "mobx-react-lite";
import categoryStore from "../../store/CategoryStore";
import CategoryName from "../CategoryName/CategoryName";

export const TaskList = observer(() => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    taskStore.fetchTasks();
    categoryStore.fetchCategories();
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
            <div className={styles.todoTitle}>
              <div>{task.name}</div>
              <CategoryName categoryId={task.categoryId} />
            </div>
            <div className={styles.todo_content}>{task.description}</div>
          </div>
          <div className={styles.button_container}>
            <div onClick={() => handleEditClick(task)}>
              <img src="svg/edit.svg"></img>
            </div>
            <div onClick={() => handleDeleteClick(task)}>
              <img src="svg/delete.svg" />
            </div>
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
