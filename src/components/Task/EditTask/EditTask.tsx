import React, { FC, useEffect, useState, ChangeEvent } from "react";
import EditTaskProps from "./EditTask.props";
import Modal from "../../Modal/Modal";
import Task from "../../../interfaces/Task";
import styles from "../../Modal/Modal.module.css";

const EditTask: FC<EditTaskProps> = ({ isOpen, onClose, task, onEditTask }) => {
  const [taskName, setTaskName] = useState<string>(task.name.toString());
  const [taskDescription, setTaskDescription] = useState<string>(
    task.description.toString()
  );
  const [categoryId, setCategoryId] = useState<number>(task.categoryId);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8089/api/ToDoList/GetCategories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error.message);
      });
  }, [isOpen]);

  const handleEditTask = () => {
    const editTask: Task = {
      name: taskName,
      description: taskDescription,
      categoryId: categoryId,
      id: task.id,
    };

    onEditTask(editTask);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Редактирование задачи"
      buttonText="Сохранить"
      contentComponent={
        <div>
          <div className={styles.item_row}>
            <div className={styles.input_box}>
              <label htmlFor="taskName">Имя</label>
              <input
                id="taskName"
                name="taskName"
                type="text"
                placeholder="Введите имя задачи"
                value={taskName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTaskName(e.target.value)
                }
              />
            </div>
            <div className={styles.input_box}>
              <label htmlFor="taskCategory">Категория</label>
              <select
                id="taskCategory"
                name="taskCategory"
                value={categoryId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setCategoryId(Number(e.target.value))
                }
              >
                <option value="" disabled>
                  Выберите категорию
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.input_box}>
            <label htmlFor="taskDesc">Описание</label>
            <textarea
              id="taskDesc"
              name="taskDesc"
              placeholder="Введите описание задачи"
              value={taskDescription}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setTaskDescription(e.target.value)
              }
            ></textarea>
          </div>
        </div>
      }
      onCreateTask={() => handleEditTask()}
    />
  );
};

export default EditTask;
