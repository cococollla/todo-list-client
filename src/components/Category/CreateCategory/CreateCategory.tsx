import { ChangeEvent, FC, useEffect, useState } from "react";
import CreateCategoryProps from "./CreateCategory.props";
import Category from "../../../interfaces/Category";
import CategoryStore from "../../../store/CategoryStore";
import Modal from "../../Modal/Modal";
import RequiredFiled from "../../RequiredField/RequiredFiled";
import styles from "../../Modal/Modal.module.css";

const CreateCategory: FC<CreateCategoryProps> = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [isCategoryNameValid, setIsCategoryNameValid] =
    useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setCategoryName("");
      setCategoryDescription("");
      setIsCategoryNameValid(false);
    }
  }, [isOpen]);

  const handleCreateCategory = () => {
    const newCategory: Category = {
      id: 0,
      name: categoryName,
      description: categoryDescription,
    };

    CategoryStore.addCategory(newCategory);
    onClose();
  };

  const handleCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategoryName(value);
    setIsCategoryNameValid(!!value.trim());
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Создание категории"
      buttonText="Создать"
      contentComponent={
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
          <div className={styles.input_box}>
            <label htmlFor="taskDesc">Описание</label>
            <textarea
              id="taskDesc"
              name="taskDesc"
              placeholder="Введите описание категории"
              value={categoryDescription}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setCategoryDescription(e.target.value)
              }
            ></textarea>
          </div>
        </div>
      }
      onCreateTask={handleCreateCategory}
      isCreateTaskDisabled={!isCategoryNameValid}
    />
  );
};

export default CreateCategory;
