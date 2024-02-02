import { FC } from "react";
import styles from "./TextAreaField.module.css";
import TextAreaFieldProps from "./TextAreaField.props";

const TextAreaField: FC<TextAreaFieldProps> = ({
  value,
  onChange,
  helperText,
  placeholder,
  errorMessage,
  ...props
}) => {
  return (
    <>
      <div className={styles.input_box}>
        <label htmlFor="fieldName">Описание</label>
        <textarea
          placeholder={placeholder}
          name="fieldName"
          value={value}
          onChange={onChange}
          className={
            errorMessage
              ? `${styles.textarea_invalid}`
              : `${styles.textarea_valid}`
          }
        ></textarea>
        {errorMessage ? (
          <div className={styles.error_message}>{errorMessage}</div>
        ) : (
          <div className={styles.herlper_text}>{helperText}</div>
        )}
      </div>
    </>
  );
};

export default TextAreaField;
