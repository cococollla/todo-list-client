import { useState, useEffect, ChangeEvent, FC } from "react";
import Modal from "../../Modal/Modal";
import CreateTaskProps from "./CreateTask.props";
import styles from "../../Modal/Modal.module.css";
import taskStore from "../../../store/TaskStore";
import Task from "../../../interfaces/Task";
import RequiredFiled from "../../RequiredField/RequiredFiled";
import CategoryDropdown from "../../CategoryDropdown/CategoryDropdown";
import categoryStore from "../../../store/CategoryStore";
import Category from "../../../interfaces/Category";

const CreateTask: FC<CreateTaskProps> = ({ isOpen, onClose }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [isTaskNameValid, setIsTaskNameValid] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setTaskName("");
      setTaskDescription("");
      setCategoryId(0);
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

  const handleCategorySelect = (selectedCategory: Category) => {
    setCategoryId(selectedCategory.id);
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
              <CategoryDropdown
                selectedCategory={undefined}
                onCategorySelect={handleCategorySelect}
              />
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
