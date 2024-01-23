import { FC } from "react";
import DeleteTaskProps from "./DeleteTask.props";
import Modal from "../../Modal/Modal";
import styles from "../../Modal/Modal.module.css";

const DeleteTask: FC<DeleteTaskProps> = ({
  isOpen,
  onClose,
  task,
  onDeleteTask,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Удаление задачи"
      buttonText="Да"
      contentComponent={
        <div className={styles.msgDelete}>
          Вы уверены, что хотите удалить задачу "{task.name}"?
        </div>
      }
      onCreateTask={() => onDeleteTask(task)}
      isCreateTaskDisabled={false}
      isLoading={null}
      error={null}
    />
  );
};

export default DeleteTask;
