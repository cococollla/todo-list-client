import { FC } from "react";
import CategoryItemListProps from "./CategoryItemList.props";
import styles from "./CategoryItemList.module.css";

const CategoryItemList: FC<CategoryItemListProps> = ({
  data,
  onHandleDelete,
  onHandleEdit,
}) => {
  return (
    <div key={data.id.toString()} className={styles.item_category}>
      <div>
        <div className={styles.category_title}>{data.name}</div>
        <div className={styles.category_content}>{data.description}</div>
      </div>
      <div className={styles.button_container}>
        <div onClick={() => onHandleEdit(data)}>
          <img src="svg/edit.svg" alt="Edit" />
        </div>
        <div onClick={() => onHandleDelete(data)}>
          <img src="svg/delete.svg" alt="Delete" />
        </div>
      </div>
    </div>
  );
};

export default CategoryItemList;
