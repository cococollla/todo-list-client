import { FC } from "react";
import DeleteTaskProps from "./DeleteTask.props";
import styles from "./DeleteTask.module.css";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";

const DeleteTask: FC<DeleteTaskProps> = ({
  isOpen,
  onClose,
  task,
  onDeleteTask,
}) => {
  return (
    <MainPopup
      isOpen={isOpen}
      onClose={onClose}
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
