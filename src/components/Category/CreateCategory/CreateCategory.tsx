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
  const [isCategoryNameValid, setIsCategoryNameValid] =
    useState<boolean>(false);
  const [isCategoryDescriptionValid, setIsCategoryDescriptionValid] =
    useState<boolean>(true);
  const [isDiasbled, setIsDisabled] = useState<boolean>(true);
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    if (!isOpen) {
      setCategoryName("");
      setCategoryDescription("");
      setIsCategoryNameValid(false);
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsDisabled(
      isLoading || !isCategoryDescriptionValid || !isCategoryNameValid
    );
  }, [isLoading, isCategoryDescriptionValid, isCategoryNameValid]);

  const handleCreateCategory = async () => {
    setIsLoading(true);
    try {
      const newCategory: CategoryDto = {
        name: categoryName,
        description: categoryDescription,
      };

      const id = await CategoryStore.addCategory(newCategory);
      id && onClose();
    } catch {
      setError("Ошибка при создании категории");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = !!value.trim() && value.length <= 255;
    setCategoryName(value);
    setIsCategoryNameValid(isValid);
  };

  const handleTaskDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const isValid = value.length <= 512;
    setCategoryDescription(value);
    setIsCategoryDescriptionValid(isValid);
  };

  return (
    <MainPopup
      isOpened={isOpen}
      onClose={onClose}
      buttonText="Создать"
      error={error}
      isDisabled={isDiasbled}
      isLoading={isLoading}
      onSubmit={handleCreateCategory}
      title="Создание категории"
    >
      <div>
        <div>
          <RequiredFiled
            value={categoryName}
            isValueValid={isCategoryNameValid}
            onChange={handleCategoryNameChange}
            placeholder="Введите имя категории"
            styleClassValid={styles.required_field_category}
            styleClassInvalid={styles.required_field_category_invalid}
            errorMessage="Это поле обязательное"
          />
        </div>
        <TextAreaField
          value={categoryDescription}
          isValueValid={isCategoryDescriptionValid}
          onChange={handleTaskDescriptionChange}
          placeholder="Введите описание"
          errorMessage="Описание должно быть меньшне 512 символов"
        />
      </div>
    </MainPopup>
  );
};

export default observer(CreateCategory);
