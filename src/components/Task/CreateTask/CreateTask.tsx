import { FC, useState, useEffect, ChangeEvent } from "react";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import RequiredField from "../../Input/Input";
import CategoryDropdown from "../../CategoryDropdown/CategoryDropdown";
import Category from "../../../interfaces/Category";
import { TaskDto } from "../../../interfaces/TaskDto";
import taskStore from "../../../store/TaskStore";
import styles from "./CreateTask.module.css";
import CreateTaskProps from "./CreateTask.props";

const CreateTask: FC<CreateTaskProps> = ({ isOpen, onClose }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [isTaskNameValid, setIsTaskNameValid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setTaskName("");
      setTaskDescription("");
      setCategoryId(0);
      setIsTaskNameValid(false);
      setError(null);
    }
  }, [isOpen]);

  const handleCreateTask = async () => {
    setIsLoading(true);
    try {
      const newTask: TaskDto = {
        name: taskName,
        description: taskDescription,
        categoryId: Number(categoryId),
      };

      const id = await taskStore.addTask(newTask);
      id && onClose();
    } catch (error) {
      setError("Ошибка при создании задачи");
    } finally {
      setIsLoading(false);
    }
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
    <MainPopup
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      error={error}
      isDisabled={!isTaskNameValid}
      isLoading={isLoading}
      onSubmit={handleCreateTask}
      title="Создание задачи"
    >
      <div>
        <div className={styles.item_row}>
          <RequiredField
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
    </MainPopup>
  );
};

export default CreateTask;
