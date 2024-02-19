import { FC } from "react";
import CategoryNameProps from "./CategoryName.props";
import categoryStore from "../../store/CategoryStore";
import styles from "./CategoryName.module.css";

const CategoryName: FC<CategoryNameProps> = ({ categoryId }) => {
  const categoryName = categoryStore.getCategory(categoryId)?.name;

  return !categoryName ? null : (
    <div className={styles.item_row}>
      <img src="svg/folder.svg"></img>{" "}
      <div className={styles.category_description}>{categoryName}</div>
    </div>
  );
};

export default CategoryName;
