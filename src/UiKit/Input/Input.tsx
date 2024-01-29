import { FC } from "react";
import InputProps from "./Input.props";
import styles from "./Input.module.css";

const Input: FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  isValueValid,
  styleClassValid,
  styleClassInvalid,
  errorMessage,
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
            !isValueValid ? `${styleClassInvalid}` : `${styleClassValid}`
          }
        ></input>
        <div
          className={
            isValueValid
              ? `${styles.error_message_hidden}`
              : `${styles.error_message}`
          }
        >
          {errorMessage}
        </div>
      </div>
    </>
  );
};

export default Input;
