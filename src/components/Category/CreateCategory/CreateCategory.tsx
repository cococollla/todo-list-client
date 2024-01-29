import { ChangeEvent, useEffect, useState } from "react";
import CategoryStore from "../../../store/CategoryStore";
import RequiredFiled from "../../../UiKit/Input/Input";
import styles from "./CreateCategory.module.css";
import { CategoryDto } from "../../../interfaces/CategoryDto";
import ModalStore from "../../../store/ModalStore";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import TextAreaField from "../../../UiKit/TextAreaField/TextAreaField";
import { observer } from "mobx-react";
import { useLoadingState } from "../../../hooks/useLoadingState";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [isCategoryNameValid, setIsCategoryNameValid] =
    useState<boolean>(false);
  const [isCategoryDescriptionValid, setIsCategoryDescriptionValid] =
    useState<boolean>(true);
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    if (ModalStore.modalIsOpen && ModalStore.modalType === "createCategory") {
      setCategoryName("");
      setCategoryDescription("");
      setIsCategoryNameValid(false);
      setError(null);
    }
  }, [ModalStore.modalIsOpen, ModalStore.modalType]);

  const handleCreateCategory = async () => {
    setIsLoading(true);
    try {
      const newCategory: CategoryDto = {
        name: categoryName,
        description: categoryDescription,
      };

      const id = await CategoryStore.addCategory(newCategory);
      id && ModalStore.setModalIsOpen(false, "createCategory");
    } catch {
      setError("Ошибка при создании категории");
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <MainPopup
      onClose={() => {
        ModalStore.setModalIsOpen(false, "createCategory");
      }}
      buttonText="Создать"
      error={error}
      isDisabled={!isCategoryNameValid}
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
