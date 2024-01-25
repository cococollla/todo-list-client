import { FC, useEffect, useState } from "react";
import Category from "../../interfaces/Category";
import categoryStore from "../../store/CategoryStore";
import styles from "./CategotyList.module.css";
import { observer } from "mobx-react";
import EditCategory from "../Category/EditCategory/EditCategory";
import DelteCategory from "../Category/DeleteCategory/DeleteCategory";
import CreateCategory from "../Category/CreateCategory/CreateCategory";
import ModalStore from "../../store/ModalStore";

export const CategotyList = observer(() => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    categoryStore.fetchCategories();
  }, []);

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    ModalStore.setModalIsOpen(true, "editCategory");
  };

  const handleEditTask = (category: Category) => {
    categoryStore.editCategory(category);
    ModalStore.setModalIsOpen(false, "editCategory");
  };

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    ModalStore.setModalIsOpen(true, "deleteCategory");
  };

  const handleDeleteCategory = (category: Category) => {
    categoryStore.deleteCategory(category);
    ModalStore.setModalIsOpen(false, "deleteCategory");
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
      {ModalStore.modalType === "createCategory" && <CreateCategory />}
      {selectedCategory && ModalStore.modalType === "editCategory" && (
        <EditCategory
          category={selectedCategory}
          onEditCategory={handleEditTask}
        />
      )}
      {selectedCategory && ModalStore.modalType === "deleteCategory" && (
        <DelteCategory
          category={selectedCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      )}
    </>
  );
});

export default CategotyList;
