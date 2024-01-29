import { FC, useEffect } from "react";
import Category from "../../interfaces/Category";
import categoryStore from "../../store/CategoryStore";
import styles from "./CategotyList.module.css";
import { observer } from "mobx-react";
import CategoryListProps from "./CategoryList.props";

export const CategotyList: FC<CategoryListProps> = ({
  setSelectedCategory,
  setDeleteModalOpen,
  setEditModalOpen,
}) => {
  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };
  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  return (
    <>
      {categoryStore.categories.length === 0 ? (
        <div className={styles.error}>
          Не удалось загрузить список категорий
        </div>
      ) : (
        categoryStore.categories.map((category) => (
          <div key={category.id.toString()} className={styles.item_category}>
            <div>
              <div className={styles.category_title}>{category.name}</div>
              <div className={styles.category_content}>
                {category.description}
              </div>
            </div>
            <div className={styles.button_container}>
              <div onClick={() => handleEditClick(category)}>
                <img src="svg/edit.svg" alt="Edit" />
              </div>
              <div onClick={() => handleDeleteClick(category)}>
                <img src="svg/delete.svg" alt="Delete" />
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default observer(CategotyList);
