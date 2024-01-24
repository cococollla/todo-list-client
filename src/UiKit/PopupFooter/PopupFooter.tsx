import React, { FC } from "react";
import PopupFooterProps from "./PopupFooter.props";
import styles from "./PopupFooter.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

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
        <button
          className={styles.button_primary}
          type="button"
          onClick={() => primaryButtonOnClick()}
          disabled={isPrimaryButtonIsDisabled}
        >
          {isLoading ? <LoadingSpinner /> : primaryButtonText}
        </button>
        <button
          className={styles.button_secondary}
          type="button"
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </>
  );
};

export default PopupFooter;
