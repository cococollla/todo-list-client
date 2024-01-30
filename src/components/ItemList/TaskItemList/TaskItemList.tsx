import { FC } from "react";
import styles from "./TaskItemList.module.css";
import CategoryName from "../../CategoryName/CategoryName";
import TaskItemListProps from "./TaskItemList.Props";

const TaskItemList: FC<TaskItemListProps> = ({
  data,
  onHandleDelete,
  onHandleEdit,
}) => {
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

export default TaskItemList;
