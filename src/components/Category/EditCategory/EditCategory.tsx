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

const EditCategory: FC<EditCategoryProps> = ({ category, isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState<string>(category.name);
  const [categoryDescription, setCategoryDescription] = useState<string>(
    category.description
  );
  const [isCategoryDescriptionValid, setIsCategoryDescriptionValid] =
    useState<boolean>(true);
  const [isCategoryNameValid, setIsCategoryNameValid] = useState<boolean>(true);
  const [isDiasbled, setIsDisabled] = useState<boolean>(true);
  const [errorInputName, setErrorInputName] = useState<string | undefined>();
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    if (isOpen) {
      setCategoryName(category.name);
      setCategoryDescription(category.description);
      setIsCategoryNameValid(true);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsDisabled(
      isLoading || !isCategoryDescriptionValid || !isCategoryNameValid
    );
  }, [isLoading, isCategoryDescriptionValid, isCategoryNameValid]);

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
    setCategoryDescription(value);
    setIsCategoryDescriptionValid(value.length <= 512);
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

export default observer(EditCategory);
