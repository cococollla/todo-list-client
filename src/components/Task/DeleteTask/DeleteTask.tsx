import { FC, useState } from "react";
import DeleteTaskProps from "./DeleteTask.props";
import styles from "./DeleteTask.module.css";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import ModalStore from "../../../store/ModalStore";
import taskStore from "../../../store/TaskStore";
import Task from "../../../interfaces/Task";
import { useLoadingState } from "../../../hooks/useLoadingState";

const DeleteTask: FC<DeleteTaskProps> = ({ task }) => {
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  const handleDeleteTask = async () => {
    setIsLoading(true);
    try {
      const deleteTask: Task = {
        id: task.id,
        name: task.name,
        description: task.description,
        categoryId: task.categoryId,
      };

      const successful = await taskStore.deleteTask(deleteTask);
      successful
        ? ModalStore.setModalIsOpen(false, "deleteTask")
        : setError("Произошла ошибка при удалении задачи");
    } catch {
      setError("Произошла ошибка при удалении задачи");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <MainPopup
      onClose={() => ModalStore.setModalIsOpen(false, "deleteTask")}
      buttonText="Да"
      error={error}
      isDisabled={false}
      isLoading={isLoading}
      onSubmit={handleDeleteTask}
      title="Удаление задачи"
    >
      <div className={styles.msg_delete}>
        Вы уверены, что хотите удлаить задачу {task.name}?
      </div>
    </MainPopup>
  );
};

export default DeleteTask;
