import { FC } from "react";
import styles from "./Button.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ButtonProps from "./Button.props";

const Button: FC<ButtonProps> = ({
  buttonType,
  buttonText,
  isLoading,
  disabled,
  onClick,
  ...props
}) => {
  const buttonClass =
    buttonType === "primary" ? styles.button_primary : styles.button_secondary;

  return (
    <button
      className={buttonClass}
      type="button"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {isLoading ? <LoadingSpinner /> : buttonText}
    </button>
  );
};

export default Button;
