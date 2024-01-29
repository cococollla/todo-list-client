import { FC } from "react";
import styles from "./TaskList.module.css";
import Task from "../../interfaces/Task";
import taskStore from "../../store/TaskStore";
import CategoryName from "../CategoryName/CategoryName";
import ModalStore, { ModalType } from "../../store/ModalStore";
import TaskListProps from "./TaskListProps";
import { observer } from "mobx-react";

export const TaskList: FC<TaskListProps> = ({ setSelectedTask }) => {
  const handleClick = (task: Task, modalType: ModalType) => {
    setSelectedTask(task);
    ModalStore.setModalIsOpen(true, modalType);
  };

  return (
    <>
      {taskStore.tasks.length === 0 ? (
        <div className={styles.error}>Не удалось загрузить список задач</div>
      ) : (
        taskStore.tasks.map((task) => (
          <div key={task.id.toString()} className={styles.item_todo}>
            <div className={styles.todo_content}>
              <div className={styles.todoTitle}>
                <div>{task.name}</div>
                <CategoryName categoryId={task.categoryId} />
              </div>
              <div className={styles.todo_content}>{task.description}</div>
            </div>
            <div className={styles.button_container}>
              <div onClick={() => handleClick(task, "editTask")}>
                <img src="svg/edit.svg" alt="Edit" />
              </div>
              <div onClick={() => handleClick(task, "deleteConfirm")}>
                <img src="svg/delete.svg" alt="Delete" />
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default observer(TaskList);
