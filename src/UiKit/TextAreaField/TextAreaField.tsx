import { FC } from "react";
import styles from "./TextAreaField.module.css";
import TextAreaFieldProps from "./TextAreaField.props";

const TextAreaField: FC<TextAreaFieldProps> = ({
  value,
  isValueValid,
  onValueChange,
  placeholderValue,
}) => {
  return (
    <>
      <div className={styles.input_box}>
        <label htmlFor="fieldName">Описание</label>
        <textarea
          placeholder={placeholderValue}
          name="fieldName"
          value={value}
          onChange={onValueChange}
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
          Описание должно быть меньше 1536 символов
        </div>
      </div>
    </>
  );
};

export default TextAreaField;
