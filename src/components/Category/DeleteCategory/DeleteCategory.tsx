import { FC } from "react";
import DeleteCategoryProps from "./DeleteCategory.props";
import styles from "./DeleteCategory.module.css";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import ModalStore from "../../../store/ModalStore";

const DelteCategory: FC<DeleteCategoryProps> = ({
  category,
  onDeleteCategory,
}) => {
  return (
    <MainPopup
      onClose={() => ModalStore.setModalIsOpen(false, "deleteCategory")}
      buttonText="Да"
      error={null}
      isDisabled={false}
      isLoading={false}
      onSubmit={() => onDeleteCategory(category)}
      title="Удаление категории"
    >
      <div className={styles.msg_delete}>
        Вы уверены, что хотите удалить категорию "{category.name}"?
      </div>
    </MainPopup>
  );
};

export default DelteCategory;
