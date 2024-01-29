import { FC, useEffect } from "react";
import Category from "../../interfaces/Category";
import categoryStore from "../../store/CategoryStore";
import styles from "./CategotyList.module.css";
import { observer } from "mobx-react";
import ModalStore, { ModalType } from "../../store/ModalStore";
import CategoryListProps from "./CategoryList.props";

export const CategotyList: FC<CategoryListProps> = ({
  setSelectedCategory,
}) => {
  useEffect(() => {
    categoryStore.fetchCategories();
  }, []);

  const handleClick = (category: Category, modalType: ModalType) => {
    setSelectedCategory(category);
    ModalStore.setModalIsOpen(true, modalType);
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
              <div onClick={() => handleClick(category, "editCategory")}>
                <img src="svg/edit.svg" alt="Edit" />
              </div>
              <div onClick={() => handleClick(category, "deleteConfirm")}>
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
