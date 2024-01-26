import { FC } from "react";
import DeleteTaskProps from "./DeleteTask.props";
import styles from "./DeleteTask.module.css";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import ModalStore from "../../../store/ModalStore";
import taskStore from "../../../store/TaskStore";
import Task from "../../../interfaces/Task";

const DeleteTask: FC<DeleteTaskProps> = ({ task }) => {
  const handleDeleteTask = () => {
    const deleteTask: Task = {
      id: task.id,
      name: task.name,
      description: task.description,
      categoryId: task.categoryId,
    };

    taskStore.deleteTask(deleteTask);
    ModalStore.setModalIsOpen(false, "deleteTask");
  };
  return (
    <MainPopup
      onClose={() => ModalStore.setModalIsOpen(false, "deleteTask")}
      buttonText="Да"
      error={null}
      isDisabled={false}
      isLoading={false}
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
