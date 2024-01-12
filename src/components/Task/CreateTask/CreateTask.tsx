import React, { useState, useEffect, ChangeEvent, FC } from "react";
import Modal from "../../Modal/Modal";
import ApiServices from "../../../services/ApiServices";
import CreateTaskProps from "./CreateTask.props";
import styles from "../../Modal/Modal.module.css";

const CreateTask: FC<CreateTaskProps> = ({ isOpen, onClose }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
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
  }, []);

  const handleCreateTask = () => {
    const newTask = {
      name: taskName,
      description: taskDescription,
      categoryId: Number(categoryId),
    };

    ApiServices.createTask(newTask);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Создание задачи"
      buttonText="Создать"
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
                  setCategoryId(e.target.value)
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
      onCreateTask={handleCreateTask}
    />
  );
};

export default CreateTask;