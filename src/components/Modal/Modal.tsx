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
      onClick={onClose}
      className={isOpen ? `${styles.modal} ${styles.open}` : `${styles.modal}`}
    >
      <div
        className={styles.modal_content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {title && (
          <div className={styles.title}>
            <div>
              <span className={styles.taskTitle}>{title}</span>
            </div>
            <div>
              <img src="svg/close.svg" onClick={onClose} />
            </div>
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
