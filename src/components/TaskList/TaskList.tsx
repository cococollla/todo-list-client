import { FC } from "react";
import styles from "./TaskList.module.css";
import Task from "../../interfaces/Task";
import taskStore from "../../store/TaskStore";
import CategoryName from "../CategoryName/CategoryName";
import TaskListProps from "./TaskListProps";
import { observer } from "mobx-react";
import ItemList from "../ItemList/TaskItemList/TaskItemList";

export const TaskList: FC<TaskListProps> = ({
  setSelectedTask,
  setEditModalOpen,
  setDeleteModalOpen,
}) => {
  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    setDeleteModalOpen(true);
  };
  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  return (
    <>
      {taskStore.tasks.length === 0 ? (
        <div className={styles.error}>Не удалось загрузить список задач</div>
      ) : (
        taskStore.tasks.map((task) => (
          <ItemList
            data={task}
            onHandleDelete={handleDeleteClick}
            onHandleEdit={handleEditClick}
          />
        ))
      )}
    </>
  );
};

export default observer(TaskList);
