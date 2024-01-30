import { FC, useEffect } from "react";
import Category from "../../interfaces/Category";
import categoryStore from "../../store/CategoryStore";
import styles from "./CategotyList.module.css";
import { observer } from "mobx-react";
import CategoryListProps from "./CategoryList.props";
import CategoryItemList from "../ItemList/CategoryItemList/CategoryItemList";

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
          <CategoryItemList
            data={category}
            onHandleDelete={handleDeleteClick}
            onHandleEdit={handleEditClick}
          />
        ))
      )}
    </>
  );
};

export default observer(CategotyList);
