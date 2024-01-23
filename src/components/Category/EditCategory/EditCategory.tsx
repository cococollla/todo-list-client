import { ChangeEvent, FC, useEffect, useState } from "react";
import EditCategoryProps from "./EditCategory.props";
import Category from "../../../interfaces/Category";
import Modal from "../../Modal/Modal";
import RequiredFiled from "../../Input/Input";
import styles from "../../Modal/Modal.module.css";

const EditCategory: FC<EditCategoryProps> = ({
  isOpen,
  onClose,
  category,
  onEditCategory: onSubmit,
}) => {
  const [categoryName, setCategoryName] = useState<string>(category.name);
  const [categoryDescription, setCategoryDescription] = useState<string>(
    category.description
  );
  const [isCategoryNameValid, setIsCategoryNameValid] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setCategoryName(category.name);
      setCategoryDescription(category.description);
      setIsCategoryNameValid(true);
    }
  }, [isOpen]);

  const handleCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategoryName(value);
    setIsCategoryNameValid(!!value.trim());
  };

  const handleEditCategory = () => {
    const editCategory: Category = {
      id: category.id,
      name: categoryName,
      description: categoryDescription,
    };

    onSubmit(editCategory);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Редактирование категории"
      buttonText="Сохранить"
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
              placeholder="Введите описание задачи"
              value={categoryDescription}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setCategoryDescription(e.target.value)
              }
            ></textarea>
          </div>
        </div>
      }
      onCreateTask={() => handleEditCategory()}
      isCreateTaskDisabled={!isCategoryNameValid}
      isLoading={null}
      error={null}
    />
  );
};

export default EditCategory;
