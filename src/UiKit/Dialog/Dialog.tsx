import { FC } from "react";
import DialogProps from "./Dialog.props";
import OverlayingPopup from "../OverlayingPopup/OverlayingPopup";
import styles from "./Dialog.module.css";
import Button from "../Button/Button";

const Dialog: FC<DialogProps> = ({
  isOpened,
  onClose,
  primaryButtonOnClick,
  primaryButtonText,
  secondaryButtonOnClick,
  secondaryButtonText,
  isDisabled,
  isLoading,
  text,
  title,
  extraContent,
}) => {
  return (
    <OverlayingPopup isOpen={isOpened} onClose={() => onClose()}>
      <div className={styles.container}>
        <div className={styles.title}>
          <div>
            <span className={styles.title_text}>{title}</span>
          </div>
          <div>
            <img src="svg/close.svg" onClick={onClose} />
          </div>
        </div>
        <div className={styles.modal_content}>{text}</div>
        {extraContent}
        <div className={styles.button_container}>
          <Button
            buttonType="primary"
            onClick={primaryButtonOnClick}
            disabled={isDisabled}
            isLoading={isLoading}
            buttonText={primaryButtonText}
          />
          <Button
            buttonType="secondary"
            onClick={secondaryButtonOnClick}
            buttonText={secondaryButtonText}
          />
        </div>
      </div>
    </OverlayingPopup>
  );
};

export default Dialog;
