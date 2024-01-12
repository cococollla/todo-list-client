import React, { FC } from "react";
import "./Modal.css";
import ModalProps from "../../interfaces/ModalProps";

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  buttonText,
  contentComponent,
  onCreateTask,
}) => {
  return (
    <div className={isOpen ? "modal open" : "modal"}>
      <div className="modal-content">
        {title && (
          <div className="title">
            <span id="taskTitle">{title}</span>
          </div>
        )}
        {contentComponent}
        <div className="button-container">
          <button
            className="button-primary"
            type="button"
            onClick={onCreateTask}
          >
            {buttonText}
          </button>
          <button className="button-secondary" type="button" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
