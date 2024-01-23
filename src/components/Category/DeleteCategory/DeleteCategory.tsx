import { FC } from "react";
import DeleteCategoryProps from "./DeleteCategory.props";
import styles from "../../Modal/Modal.module.css";
import Modal from "../../Modal/Modal";

const DelteCategory: FC<DeleteCategoryProps> = ({
  isOpen,
  onClose,
  category,
  onDeleteCategory,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Удаление задачи"
      buttonText="Да"
      contentComponent={
        <div className={styles.msgDelete}>
          Вы уверены, что хотите удалить категорию "{category.name}"?
        </div>
      }
      onCreateTask={() => onDeleteCategory(category)}
      isCreateTaskDisabled={false}
      isLoading={null}
      error={null}
    />
  );
};

export default DelteCategory;
