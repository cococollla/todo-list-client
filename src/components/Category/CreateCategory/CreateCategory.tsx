import { ChangeEvent, useEffect, useState } from "react";
import CategoryStore from "../../../store/CategoryStore";
import RequiredFiled from "../../Input/Input";
import styles from "./CreateCategory.module.css";
import { CategoryDto } from "../../../interfaces/CategoryDto";
import ModalStore from "../../../store/ModalStore";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import TextAreaField from "../../../UiKit/TextAreaField/TextAreaField";
import { observer } from "mobx-react";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [isCategoryNameValid, setIsCategoryNameValid] =
    useState<boolean>(false);
  const [isCategoryDescriptionValid, setIsCategoryDescriptionValid] =
    useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (ModalStore.modalIsOpen && ModalStore.modalType === "createCategory") {
      setCategoryName("");
      setCategoryDescription("");
      setIsCategoryNameValid(false);
    }
  }, [ModalStore.modalIsOpen, ModalStore.modalType]);

  const handleCreateCategory = () => {
    const newCategory: CategoryDto = {
      name: categoryName,
      description: categoryDescription,
    };

    CategoryStore.addCategory(newCategory);
    ModalStore.setModalIsOpen(false, "createTask");
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
            onValueChange={handleCategoryNameChange}
            placeholderValue="Введите имя категории"
            styleClassValid={styles.required_field_category}
            styleClassInvalid={styles.required_field_category_invalid}
          />
        </div>
        <TextAreaField
          value={categoryDescription}
          isValueValid={isCategoryDescriptionValid}
          onValueChange={handleTaskDescriptionChange}
          placeholderValue="Введите описание"
        />
      </div>
    </MainPopup>
  );
};

export default observer(CreateCategory);
