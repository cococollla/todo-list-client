import React, { FC } from "react";
import styles from "./Modal.module.css";
import ModalProps from "./Modal.props";

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  buttonText,
  contentComponent,
  onCreateTask,
  isCreateTaskDisabled,
}) => {
  return (
    <div
      className={isOpen ? `${styles.modal} ${styles.open}` : `${styles.modal}`}
    >
      <div className={styles.modal_content}>
        {title && (
          <div className={styles.title}>
            <span className={styles.taskTitle}>{title}</span>
          </div>
        )}
        {contentComponent}
        <div className={styles.button_container}>
          <button
            className={styles.button_primary}
            type="button"
            onClick={() => onCreateTask()}
            disabled={isCreateTaskDisabled}
          >
            {buttonText}
          </button>
          <button
            className={styles.button_secondary}
            type="button"
            onClick={onClose}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
