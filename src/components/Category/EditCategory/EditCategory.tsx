import { ChangeEvent, FC, useEffect, useState } from "react";
import EditCategoryProps from "./EditCategory.props";
import Category from "../../../interfaces/Category";
import RequiredFiled from "../../../UiKit/Input/Input";
import styles from "./EditCategory.module.css";
import ModalStore from "../../../store/ModalStore";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import TextAreaField from "../../../UiKit/TextAreaField/TextAreaField";
import { observer } from "mobx-react";
import categoryStore from "../../../store/CategoryStore";
import { useLoadingState } from "../../../hooks/useLoadingState";

const EditCategory: FC<EditCategoryProps> = ({ category }) => {
  const [categoryName, setCategoryName] = useState<string>(category.name);
  const [categoryDescription, setCategoryDescription] = useState<string>(
    category.description
  );
  const [isCategoryDescriptionValid, setIsCategoryDescriptionValid] =
    useState<boolean>(true);
  const [isCategoryNameValid, setIsCategoryNameValid] = useState<boolean>(true);
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    if (ModalStore.modalIsOpen && ModalStore.modalType === "editCategory") {
      setCategoryName(category.name);
      setCategoryDescription(category.description);
      setIsCategoryNameValid(true);
    }
  }, [ModalStore.modalIsOpen, ModalStore.modalType]);

  const handleCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategoryName(value);
    setIsCategoryNameValid(!!value.trim());
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
      id && ModalStore.setModalIsOpen(false, "editCategory");
    } catch {
      setError("Ошибка при обновлении категории");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainPopup
      onClose={() => ModalStore.setModalIsOpen(false, "editCategory")}
      buttonText="Сохранить"
      error={error}
      isDisabled={!isCategoryNameValid}
      isLoading={isLoading}
      onSubmit={handleEditCategory}
      title="Редиктирование категории"
    >
      {" "}
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

export default observer(EditCategory);
