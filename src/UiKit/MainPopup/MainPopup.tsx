import React, { FC } from "react";
import MainPopupProps from "./MainPopup.props";
import styles from "./MainPopup.module.css";
import PopupHeader from "../PopupHeader/PopupHeader";
import OverlayingPopup from "../OverlayingPopup/OverlayingPopup";
import PopupFooter from "../PopupFooter/PopupFooter";
import { observer } from "mobx-react";
import ModalStore from "../../store/ModalStore";

const MainPopup: FC<MainPopupProps> = ({
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
    <OverlayingPopup isOpen={ModalStore.modalIsOpen} onClose={() => onClose()}>
      <div className={styles.container}>
        <PopupHeader title={title} onClose={() => onClose()} />
        {children}
        <PopupFooter
          primaryButtonText={buttonText}
          primaryButtonOnClick={onSubmit}
          isPrimaryButtonIsDisabled={isDisabled}
          isLoading={isLoading}
          onClose={() => onClose()}
          error={error}
        />
      </div>
    </OverlayingPopup>
  );
};

export default observer(MainPopup);
