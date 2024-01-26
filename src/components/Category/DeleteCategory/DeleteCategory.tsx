import { FC } from "react";
import DeleteCategoryProps from "./DeleteCategory.props";
import styles from "./DeleteCategory.module.css";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import ModalStore from "../../../store/ModalStore";
import Category from "../../../interfaces/Category";
import categoryStore from "../../../store/CategoryStore";

const DelteCategory: FC<DeleteCategoryProps> = ({ category }) => {
  const handleDeleteCategory = () => {
    const deleteCategory: Category = {
      id: category.id,
      name: category.name,
      description: category.description,
    };
    categoryStore.deleteCategory(deleteCategory);
    ModalStore.setModalIsOpen(false, "deleteCategory");
  };

  return (
    <MainPopup
      onClose={() => ModalStore.setModalIsOpen(false, "deleteCategory")}
      buttonText="Да"
      error={null}
      isDisabled={false}
      isLoading={false}
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
