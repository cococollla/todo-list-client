import { FC, useEffect } from "react";
import Category from "../../interfaces/Category";
import categoryStore from "../../store/CategoryStore";
import styles from "./CategotyList.module.css";
import { observer } from "mobx-react";
import ModalStore from "../../store/ModalStore";
import CategoryListProps from "./CategoryList.props";

export const CategotyList: FC<CategoryListProps> = observer(
  ({ setSelectedCategory }) => {
    useEffect(() => {
      categoryStore.fetchCategories();
    }, []);

    const handleEditClick = (category: Category) => {
      setSelectedCategory(category);
      ModalStore.setModalIsOpen(true, "editCategory");
    };

    const handleDeleteClick = (category: Category) => {
      setSelectedCategory(category);
      ModalStore.setModalIsOpen(true, "deleteCategory");
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
      </>
    );
  }
);

export default CategotyList;
