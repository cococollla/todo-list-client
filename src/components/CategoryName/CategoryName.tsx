import { FC, useCallback, useState } from "react";
import CategoryNameProps from "./CategoryName.props";
import categoryStore from "../../store/CategoryStore";
import styles from "../TaskList/TaskList.module.css";

const CategoryName: FC<CategoryNameProps> = ({ categoryId }) => {
  const categoryName = categoryStore.getCategory(categoryId)?.name;

  return !categoryName ? null : (
    <div className={styles.item_row}>
      <img src="svg/folder.svg"></img> <div>{categoryName}</div>
    </div>
  );
};

export default CategoryName;
