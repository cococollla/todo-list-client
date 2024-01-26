import { FC } from "react";
import SecondaryButtonProps from "./SecondaryButton.props";
import styles from "./SecondaryButton.module.css";

const SecondaryButton: FC<SecondaryButtonProps> = ({ onClick, buttonText }) => (
  <button className={styles.button_secondary} type="button" onClick={onClick}>
    {buttonText}
  </button>
);

export default SecondaryButton;
