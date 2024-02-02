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
  const [errorInputName, setErrorInputName] = useState<string | undefined>(
    "Это поле обяхательное"
  );
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
    setIsDisabled(isLoading || !isCategoryDescriptionValid || !!errorInputName);
  }, [isLoading, isCategoryDescriptionValid, isCategoryNameValid]);

  const handleCreateCategory = async () => {
    setIsLoading(true);
    try {
      const newCategory: CategoryDto = {
        name: categoryName,
        description: categoryDescription,
      };

      const id = await CategoryStore.addCategory(newCategory);
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
    const isLenght = value.length <= 255;
    setCategoryName(value);
    isEmpty
      ? setErrorInputName(undefined)
      : setErrorInputName("Это поле обязательное");
    isLenght
      ? setErrorInputName(undefined)
      : setErrorInputName("Длина должна быть меньше 255 символов");
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
            errorMessage={errorInputName}
            helperText="Введите название категории"
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
