import { ChangeEvent, FC, useEffect, useState } from "react";
import CategoryStore from "../../../store/CategoryStore";
import RequiredFiled from "../../../UiKit/Input/Input";
import styles from "./CreateCategory.module.css";
import { CategoryDto } from "../../../interfaces/CategoryDto";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import TextAreaField from "../../../UiKit/TextAreaField/TextAreaField";
import { observer } from "mobx-react";
import { useLoadingState } from "../../../hooks/useLoadingState";
import CreateCategiryProps from "./CreateTask.props";
import { Status } from "../../../UiKit/Input/Input.props";

const CreateCategory: FC<CreateCategiryProps> = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [isDiasbled, setIsDisabled] = useState<boolean>(true);
  const [errorInput, setErrorInput] = useState<Status | undefined>("error");
  const [errorMessageTextArea, setErrorMessageTextArea] = useState<
    string | null
  >(null);
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    if (!isOpen) {
      setCategoryName("");
      setCategoryDescription("");
      setErrorInput("error");
      setErrorMessageTextArea(null);
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsDisabled(
      isLoading || errorInput !== undefined || errorMessageTextArea !== null
    );
  }, [isLoading, errorInput, errorMessageTextArea]);

  const handleCreateCategory = async () => {
    setIsLoading(true);
    try {
      const newCategory: CategoryDto = {
        name: categoryName,
        description: categoryDescription,
      };

      await CategoryStore.addCategory(newCategory);
      onClose();
    } catch {
      setError("Ошибка при создании категории");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isEmpty = !!value.trim();
    const isLengthValid = value.length <= 255;
    setCategoryName(value);

    if (isEmpty && isLengthValid) {
      setErrorInput(undefined);
    } else if (!isEmpty && isLengthValid) {
      setErrorInput("error");
    } else if (isEmpty && !isLengthValid) {
      setErrorInput("warning");
    }
  };

  const handleTaskDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const isLengthValid = value.length <= 512;
    setCategoryDescription(value);
    isLengthValid
      ? setErrorMessageTextArea(null)
      : setErrorMessageTextArea("Описание должно быть меньше 512 символов");
  };

  return (
    <MainPopup
      isOpened={isOpen}
      onClose={onClose}
      buttonText="Создать"
      exdentFooterContent={
        !error ? null : <div className={styles.modal_error}>{error}</div>
      }
      isDisabled={isDiasbled}
      isLoading={isLoading}
      onSubmit={handleCreateCategory}
      title="Создание категории"
    >
      <div>
        <div>
          <RequiredFiled
            value={categoryName}
            onChange={handleCategoryNameChange}
            placeholder="Введите имя категории"
            helperText="Это поле обязательное"
            status={errorInput}
            styleClassValid={styles.required_field_category}
            styleClassInvalid={styles.required_field_category_invalid}
          />
        </div>
        <TextAreaField
          value={categoryDescription}
          onChange={handleTaskDescriptionChange}
          placeholder="Введите описание"
          errorMessage={errorMessageTextArea}
          helperText="Введите описание"
        />
      </div>
    </MainPopup>
  );
};

export default observer(CreateCategory);
