import React, { FC } from "react";
import MainPopupProps from "./MainPopup.props";
import styles from "./MainPopup.module.css";
import PopupHeader from "../PopupHeader/PopupHeader";
import OverlayingPopup from "../OverlayingPopup/OverlayingPopup";
import PopupFooter from "../PopupFooter/PopupFooter";

const MainPopup: FC<MainPopupProps> = ({
  isOpen,
  onClose,
  buttonText,
  children,
  error,
  isDisabled,
  isLoading,
  onSubmit,
  title,
}) => {
  return (
    <OverlayingPopup isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <PopupHeader title={title} onClose={onClose} />
        {children}
        <PopupFooter
          primaryButtonText={buttonText}
          primaryButtonOnClick={onSubmit}
          isPrimaryButtonIsDisabled={isDisabled}
          isLoading={isLoading}
          onClose={onClose}
          error={error}
        />
      </div>
    </OverlayingPopup>
  );
};

export default MainPopup;
