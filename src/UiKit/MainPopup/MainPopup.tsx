import { FC } from "react";
import MainPopupProps from "./MainPopup.props";
import styles from "./MainPopup.module.css";
import PopupHeader from "../PopupHeader/PopupHeader";
import OverlayingPopup from "../OverlayingPopup/OverlayingPopup";
import PopupFooter from "../PopupFooter/PopupFooter";

const MainPopup: FC<MainPopupProps> = ({
  isOpened,
  onClose,
  buttonText,
  children,
  isDisabled,
  isLoading,
  onSubmit,
  title,
  exdentFooterContent,
}) => {
  return (
    <OverlayingPopup isOpen={isOpened} onClose={() => onClose()}>
      <div className={styles.container}>
        <PopupHeader title={title} onClose={() => onClose()} />
        {children}
        <PopupFooter
          primaryButtonText={buttonText}
          primaryButtonOnClick={onSubmit}
          isPrimaryButtonIsDisabled={isDisabled}
          isLoading={isLoading}
          onClose={() => onClose()}
          exdentContent={exdentFooterContent}
        />
      </div>
    </OverlayingPopup>
  );
};

export default MainPopup;
