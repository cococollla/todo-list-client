import { FC } from "react";
import InputProps from "./Input.props";
import styles from "./Input.module.css";

const Input: FC<InputProps> = ({
  value,
  onChange,
  helperText,
  placeholder,
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
            !!errorMessage ? `${styleClassInvalid}` : `${styleClassValid}`
          }
        ></input>
        <div className={styles.helper_text_container}>
          {!!errorMessage ? (
            <div className={styles.error_message}>{errorMessage}</div>
          ) : (
            <div className={styles.herlper_text}>{helperText}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Input;
