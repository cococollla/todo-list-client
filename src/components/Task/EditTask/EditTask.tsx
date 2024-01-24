import { FC, useEffect, useState, ChangeEvent } from "react";
import EditTaskProps from "./EditTask.props";
import Task from "../../../interfaces/Task";
import styles from "./EditTask.module.css";
import RequiredFiled from "../../Input/Input";
import CategoryDropdown from "../../CategoryDropdown/CategoryDropdown";
import categoryStore from "../../../store/CategoryStore";
import Category from "../../../interfaces/Category";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import TaskStore from "../../../store/TaskStore";
import { setTextRange } from "typescript";

const EditTask: FC<EditTaskProps> = ({ isOpen, onClose, task }) => {
  const [taskName, setTaskName] = useState<string>(task.name.toString());
  const [taskDescription, setTaskDescription] = useState<string>(
    task.description.toString()
  );
  const [categoryId, setCategoryId] = useState<number>(task.categoryId);
  const [isTaskNameValid, setIsTaskNameValid] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setTaskName(task.name);
      setTaskDescription(task.description);
      setCategoryId(task.categoryId);
      setIsTaskNameValid(true);
      setError(null);
    }
  }, [isOpen]);

  const handleEditTask = async () => {
    setIsLoading(true);
    try {
      const editTask: Task = {
        name: taskName,
        description: taskDescription,
        categoryId: categoryId,
        id: task.id,
      };

      const id = await TaskStore.editTask(editTask);
      id && onClose();
    } catch {
      setError("Ошибка при обновлении задачи");
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
      buttonText="Сохранить"
      error={error}
      isDisabled={!isTaskNameValid}
      isLoading={isLoading}
      onSubmit={handleEditTask}
      title="Редактирование задачи"
    >
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
              selectedCategory={categoryStore.getCategory(categoryId)}
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

export default EditTask;
