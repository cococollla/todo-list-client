import { FC } from "react";
import styles from "./TextAreaField.module.css";
import TextAreaFieldProps from "./TextAreaField.props";

const TextAreaField: FC<TextAreaFieldProps> = ({
  value,
  isValueValid,
  onChange,
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
            !isValueValid
              ? `${styles.textarea_invalid}`
              : `${styles.textarea_valid}`
          }
        ></textarea>
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

export default TextAreaField;
