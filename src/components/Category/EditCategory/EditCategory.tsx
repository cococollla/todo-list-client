import { ChangeEvent, FC, useEffect, useState } from "react";
import EditCategoryProps from "./EditCategory.props";
import Category from "../../../interfaces/Category";
import RequiredFiled from "../../../UiKit/Input/Input";
import styles from "./EditCategory.module.css";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import TextAreaField from "../../../UiKit/TextAreaField/TextAreaField";
import { observer } from "mobx-react";
import categoryStore from "../../../store/CategoryStore";
import { useLoadingState } from "../../../hooks/useLoadingState";
import { Status } from "../../../UiKit/Input/Input.props";

const EditCategory: FC<EditCategoryProps> = ({ category, isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState<string>(category.name);
  const [categoryDescription, setCategoryDescription] = useState<string>(
    category.description
  );
  const [isDiasbled, setIsDisabled] = useState<boolean>(true);
  const [errorInput, setErrorInput] = useState<Status | undefined>(undefined);
  const [errorMessageTextArea, setErrorMessageTextArea] = useState<
    string | null
  >(null);
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    if (isOpen) {
      setCategoryName(category.name);
      setCategoryDescription(category.description);
      setErrorInput(undefined);
      setErrorMessageTextArea(null);
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsDisabled(
      isLoading || errorInput !== undefined || errorMessageTextArea !== null
    );
  }, [isLoading, errorInput, errorMessageTextArea]);

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
    setCategoryDescription(value);
    const isLengthValid = value.length <= 512;
    isLengthValid
      ? setErrorMessageTextArea(null)
      : setErrorMessageTextArea("Описание должно быть меньше 512 символов");
  };

  const handleEditCategory = async () => {
    setIsLoading(true);
    try {
      const editCategory: Category = {
        id: category.id,
        name: categoryName,
        description: categoryDescription,
      };

      const id = await categoryStore.editCategory(editCategory);
      id && onClose();
    } catch {
      setError("Ошибка при обновлении категории");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainPopup
      isOpened={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      exdentFooterContent={
        !error ? null : <div className={styles.modal_error}>{error}</div>
      }
      isDisabled={isDiasbled}
      isLoading={isLoading}
      onSubmit={handleEditCategory}
      title="Редиктирование категории"
    >
      {" "}
      <div>
        <div>
          <RequiredFiled
            value={categoryName}
            onChange={handleCategoryNameChange}
            placeholder="Введите имя категории"
            styleClassValid={styles.required_field_category}
            styleClassInvalid={styles.required_field_category_invalid}
            helperText="Это поле обязательное"
            status={errorInput}
          />
        </div>
        <TextAreaField
          value={categoryDescription}
          onChange={handleTaskDescriptionChange}
          placeholder="Введите описание"
          errorMessage={errorMessageTextArea}
        />
      </div>
    </MainPopup>
  );
};

export default observer(EditCategory);
