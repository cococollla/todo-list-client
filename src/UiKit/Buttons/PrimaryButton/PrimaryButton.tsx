import { FC } from "react";
import PrimaryButtonProps from "./PrimaryButton.props";
import styles from "./PrimaryButton.module.css";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const PrimaryButton: FC<PrimaryButtonProps> = ({
  onClick,
  isDisabled,
  buttonText,
  isLoading,
}) => (
  <button
    className={styles.button_primary}
    type="button"
    onClick={onClick}
    disabled={isDisabled}
  >
    {isLoading ? <LoadingSpinner /> : buttonText}
  </button>
);

export default PrimaryButton;
