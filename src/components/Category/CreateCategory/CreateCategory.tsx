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

const CreateCategory: FC<CreateCategiryProps> = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [isDiasbled, setIsDisabled] = useState<boolean>(true);
  const [errorMessageInput, setErrorMessageInput] = useState<string | null>(
    "Это поле обязательное"
  );
  const [errorMessageTextArea, setErrorMessageTextArea] = useState<
    string | null
  >(null);
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    if (!isOpen) {
      setCategoryName("");
      setCategoryDescription("");
      setErrorMessageInput("Это поле обязательное");
      setErrorMessageTextArea(null);
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsDisabled(
      isLoading || errorMessageInput !== null || errorMessageTextArea !== null
    );
  }, [isLoading, errorMessageInput, errorMessageTextArea]);

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
      setErrorMessageInput(null);
    } else if (isEmpty && !isLengthValid) {
      setErrorMessageInput("Длина должна быть меньше 255 символов");
    } else {
      setErrorMessageInput("Это поле обязательное");
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
            styleClassValid={styles.required_field_category}
            styleClassInvalid={styles.required_field_category_invalid}
            errorMessage={errorMessageInput}
            helperText="Введите название категории"
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
