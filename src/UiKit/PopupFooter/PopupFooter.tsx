import { FC } from "react";
import PopupFooterProps from "./PopupFooter.props";
import styles from "./PopupFooter.module.css";
import SecondaryButton from "../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";

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
        <PrimaryButton
          onClick={primaryButtonOnClick}
          isDisabled={isPrimaryButtonIsDisabled}
          buttonText={primaryButtonText}
          isLoading={isLoading}
        />
        <SecondaryButton onClick={onClose} buttonText="Закрыть" />
      </div>
    </>
  );
};

export default PopupFooter;
