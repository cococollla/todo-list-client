import ItemListProps from "./ItemList.props";
import styles from "./ItemList.module.css";

const ItemList = <T extends { id: number; name: string; description: string }>({
  data,
  onDelete,
  onEdit,
  extendTitle,
}: ItemListProps<T>) => {
  return (
    <div key={data.id.toString()} className={styles.item_todo}>
      <div className={styles.todo_content}>
        <div className={styles.todoTitle}>
          <div>{data.name}</div>
          {extendTitle}
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

export default ItemList;
