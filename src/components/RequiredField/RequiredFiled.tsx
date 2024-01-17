import { FC, useState } from "react";
import RequiredFieldProps from "./RequiredField.props";
import styles from "../Modal/Modal.module.css";

const RequiredFiled: FC<RequiredFieldProps> = ({
  value,
  onValueChange,
  placeholderValue,
  isValueValid,
  styleClassValid,
  styleClassInvalid
}) => {
  return (
    <>
      <div className={styles.input_box}>
        <label className={styles.item_row} htmlFor="fieldName">
          Имя
          <div className={styles.required_star}>*</div>
        </label>
        <input
          placeholder={placeholderValue}
          name="fieldName"
          type="text"
          value={value}
          onChange={onValueChange}
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
          Это поле обязательное
        </div>
      </div>
    </>
  );
};

export default RequiredFiled;