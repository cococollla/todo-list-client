import { FC } from "react";
import OverlaynigPopupProps from "./OverlayingPopup.props";
import Portal from "../Portal/Portal";
import styles from "./OverlayingPopup.module.css";

const OverlayingPopup: FC<OverlaynigPopupProps> = ({
  children,
  onClose,
  isOpen,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={styles.container} onClick={onClose}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default OverlayingPopup;
