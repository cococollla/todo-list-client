import { FC } from "react";
import PopupFooterProps from "./PopupFooter.props";
import styles from "./PopupFooter.module.css";
import Button from "../Button/Button";

const PopupFooter: FC<PopupFooterProps> = ({
  primaryButtonText,
  primaryButtonOnClick,
  isPrimaryButtonIsDisabled,
  isLoading,
  onClose,
  error,
}) => {
  return (
    <>
      {error && <div className={styles.modal_error}>{error}</div>}
      <div className={styles.button_container}>
        <Button
          buttonType="primary"
          onClick={primaryButtonOnClick}
          disabled={isPrimaryButtonIsDisabled}
          isLoading={isLoading}
          buttonText={primaryButtonText}
        />
        <Button
          buttonType="secondary"
          onClick={onClose}
          disabled={false}
          isLoading={false}
          buttonText="Закрыть"
        />
      </div>
    </>
  );
};

export default PopupFooter;
