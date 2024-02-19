import React, { FC } from "react";
import PopupHeaderProps from "./PopupHeader.props";
import styles from "./PopupHeader.module.css";

const PopupHeader: FC<PopupHeaderProps> = ({ title, onClose }) => {
  return (
    <div className={styles.title}>
      <div>
        <span className={styles.title_text}>{title}</span>
      </div>
      <div>
        <img src="svg/close.svg" onClick={onClose} />
      </div>
    </div>
  );
};

export default PopupHeader;
