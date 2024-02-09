import { FC } from "react";
import { InputProps } from "./Input.props";
import styles from "./Input.module.css";

const Input: FC<InputProps> = ({
  value,
  status,
  onChange,
  helperText,
  placeholder,
  styleClassValid,
  styleClassInvalid,
  ...props
}) => {
  return (
    <>
      <div className={styles.input_box}>
        <label className={styles.item_row} htmlFor="fieldName">
          Имя
          <div className={styles.required_star}>*</div>
        </label>
        <input
          placeholder={placeholder}
          name="fieldName"
          type="text"
          value={value}
          onChange={onChange}
          className={
            status === "error"
              ? `${styleClassInvalid}`
              : status === "warning"
              ? `${styleClassInvalid} ${styles.warning_input}`
              : `${styleClassValid}`
          }
        ></input>
        <div
          className={
            status === "error"
              ? `${styles.error_message}`
              : status === "warning"
              ? `${styles.warning_message}`
              : `${styles.helper_text}`
          }
        >
          {helperText}
        </div>
      </div>
    </>
  );
};

export default Input;
