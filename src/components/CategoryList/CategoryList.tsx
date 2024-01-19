import { useEffect, useState } from "react";
import Category from "../../interfaces/Category";
import categoryStore from "../../store/CategoryStore";
import styles from "./CategotyList.module.css";
import { observer } from "mobx-react";
import EditCategory from "../Category/EditCategory/EditCategory";
import DelteCategory from "../Category/DeleteCategory/DeleteCategory";

export const CategotyList = observer(() => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    categoryStore.fetchCategories();
  }, []);

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  const handleEditTask = (category: Category) => {
    categoryStore.editCategory(category);
    setEditModalOpen(false);
  };

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    categoryStore.deleteCategory(category);
    setDeleteModalOpen(false);
  };

  return (
    <>
      {categoryStore.categories.map((category) => (
        <div key={category.id.toString()} className={styles.item_category}>
          <div>
            <div className={styles.category_title}>{category.name}</div>
            <div className={styles.category_content}>
              {category.description}
            </div>
          </div>
          <div className={styles.button_container}>
            <div onClick={() => handleEditClick(category)}>
              <img src="svg/edit.svg" />
            </div>
            <div onClick={() => handleDeleteClick(category)}>
              <img src="svg/delete.svg" />
            </div>
          </div>
        </div>
      ))}

      {selectedCategory && (
        <EditCategory
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          category={selectedCategory}
          onEditCategory={handleEditTask}
        />
      )}
      {selectedCategory && (
        <DelteCategory
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          category={selectedCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      )}
    </>
  );
});

export default CategotyList;
