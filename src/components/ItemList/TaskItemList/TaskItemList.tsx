import { FC } from "react";
import styles from "./TaskItemList.module.css";
import CategoryName from "../../CategoryName/CategoryName";
import TaskItemListProps from "./TaskItemList.Props";

const TaskItemList: FC<TaskItemListProps> = ({ data, onDelete, onEdit }) => {
  return (
    <div key={data.id.toString()} className={styles.item_todo}>
      <div className={styles.todo_content}>
        <div className={styles.todoTitle}>
          <div>{data.name}</div>
          <CategoryName categoryId={data.categoryId} />
        </div>
        <div className={styles.todo_content}>{data.description}</div>
      </div>
      <div className={styles.button_container}>
        <div onClick={() => onEdit(data)}>
          <img src="svg/edit.svg" alt="Edit" />
        </div>
        <div onClick={() => onDelete(data)}>
          <img src="svg/delete.svg" alt="Delete" />
        </div>
      </div>
    </div>
  );
};

export default TaskItemList;
