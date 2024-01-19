import React, { useState, useEffect, ChangeEvent, FC } from "react";
import Modal from "../../Modal/Modal";
import CreateTaskProps from "./CreateTask.props";
import styles from "../../Modal/Modal.module.css";
import taskStore from "../../../store/TaskStore";
import Task from "../../../interfaces/Task";
import RequiredFiled from "../../RequiredField/RequiredFiled";

const CreateTask: FC<CreateTaskProps> = ({ isOpen, onClose }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);
  const [isTaskNameValid, setIsTaskNameValid] = useState<boolean>(false);

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

  useEffect(() => {
    if (isOpen) {
      setTaskName("");
      setTaskDescription("");
      setCategoryId("");
      setIsTaskNameValid(false);
    }
  }, [isOpen]);

  const handleCreateTask = () => {
    const newTask: Task = {
      id: 0,
      name: taskName,
      description: taskDescription,
      categoryId: Number(categoryId),
    };

    taskStore.addTask(newTask);
    onClose();
  };

  const handleTaskNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTaskName(value);
    setIsTaskNameValid(!!value.trim());
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
            <RequiredFiled
              value={taskName}
              isValueValid={isTaskNameValid}
              onValueChange={handleTaskNameChange}
              placeholderValue="Введите имя задачи"
              styleClassValid={styles.required_field_task}
              styleClassInvalid={styles.required_field_task_invalid}
            />
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
      isCreateTaskDisabled={!isTaskNameValid}
    />
  );
};

export default CreateTask;
