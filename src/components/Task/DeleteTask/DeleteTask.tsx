import { FC } from "react";
import DeleteTaskProps from "./DeleteTask.props";
import styles from "./DeleteTask.module.css";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import ModalStore from "../../../store/ModalStore";

const DeleteTask: FC<DeleteTaskProps> = ({ task, onDeleteTask }) => {
  return (
    <MainPopup
      onClose={() => ModalStore.setModalIsOpen(false, "deleteTask")}
      buttonText="Да"
      error={null}
      isDisabled={false}
      isLoading={false}
      onSubmit={() => onDeleteTask(task)}
      title="Удаление задачи"
    >
      <div className={styles.msg_delete}>
        Вы уверены, что хотите удлаить задачу {task.name}?
      </div>
    </MainPopup>
  );
};

export default DeleteTask;
