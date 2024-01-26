import { FC, useEffect, useState } from "react";
import DeleteCategoryProps from "./DeleteCategory.props";
import styles from "./DeleteCategory.module.css";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import ModalStore from "../../../store/ModalStore";
import Category from "../../../interfaces/Category";
import categoryStore from "../../../store/CategoryStore";

const DelteCategory: FC<DeleteCategoryProps> = ({ category }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setError(null);
  }, []);

  const handleDeleteCategory = async () => {
    setIsLoading(true);
    try {
      const deleteCategory: Category = {
        id: category.id,
        name: category.name,
        description: category.description,
      };
      const successful = await categoryStore.deleteCategory(deleteCategory);
      successful
        ? ModalStore.setModalIsOpen(false, "deleteCategory")
        : setError("Произошла ошибка при удалении категории");
    } catch (error) {
      setError("Произошла ошибка при удалении категории");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainPopup
      onClose={() => ModalStore.setModalIsOpen(false, "deleteCategory")}
      buttonText="Да"
      error={error}
      isDisabled={false}
      isLoading={isLoading}
      onSubmit={handleDeleteCategory}
      title="Удаление категории"
    >
      <div className={styles.msg_delete}>
        Вы уверены, что хотите удалить категорию "{category.name}"?
      </div>
    </MainPopup>
  );
};

export default DelteCategory;
