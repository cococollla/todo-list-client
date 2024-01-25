import { useState, useEffect, FC } from "react";
import styles from "./TaskList.module.css";
import Task from "../../interfaces/Task";
import EditTask from "../Task/EditTask/EditTask";
import DeleteTask from "../Task/DeleteTask/DeleteTask";
import taskStore from "../../store/TaskStore";
import { observer } from "mobx-react-lite";
import categoryStore from "../../store/CategoryStore";
import CategoryName from "../CategoryName/CategoryName";
import TaskListProps from "./TaskListProps";
import CreateTask from "../Task/CreateTask/CreateTask";
import ModalStore from "../../store/ModalStore";

export const TaskList = observer(() => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    taskStore.fetchTasks();
    categoryStore.fetchCategories();
  }, []);

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    ModalStore.setModalIsOpen(true, "editTask");
  };

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    ModalStore.setModalIsOpen(true, "deleteTask");
  };

  const handleDeleteTask = (task: Task) => {
    taskStore.deleteTask(task);
    ModalStore.setModalIsOpen(false, "deleteTask");
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

      {ModalStore.modalType === "createTask" && <CreateTask />}

      {selectedTask && ModalStore.modalType === "editTask" && (
        <EditTask task={selectedTask} />
      )}

      {selectedTask && ModalStore.modalType === "deleteTask" && (
        <DeleteTask task={selectedTask} onDeleteTask={handleDeleteTask} />
      )}
    </>
  );
});

export default TaskList;
