import { useEffect, useState } from "react";
import Category from "../../interfaces/Category";
import categoryStore from "../../store/CategoryStore";
import styles from "../Modal/Modal.module.css";

const CategotyList = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:8089/api/ToDoList/GetCategories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }
        return response.json();
      })
      .then((data) => {
        const sortedCategories = data
          .slice()
          .sort((a: { id: number }, b: { id: number }) => a.id - b.id);

        categoryStore.setCategory(sortedCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error.message);
      });
  }, []);

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  const handleEditTask = (category: Category) => {
    // categoryStore.editCategory(category)
    setEditModalOpen(false);
  };

  return (
    <>
      {categoryStore.categories.map((category) => (
        <div key={category.id.toString()} className={styles.item_todo}>
          <div className={styles.todoTitle}>{category.name}</div>
          <div className={styles.todo_content}>{category.description}</div>
          <div className={styles.button_container}>
            <div onClick={() => handleEditClick(category)}>
              <img src="svg/edit.svg"></img>
            </div>
            <div>
              <img src="svg/delete.svg" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategotyList;
