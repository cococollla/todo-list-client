import { FC, useEffect, useState, ChangeEvent } from "react";
import EditTaskProps from "./EditTask.props";
import Task from "../../../interfaces/Task";
import styles from "./EditTask.module.css";
import RequiredField from "../../../UiKit/Input/Input";
import categoryStore from "../../../store/CategoryStore";
import Category from "../../../interfaces/Category";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import TaskStore from "../../../store/TaskStore";
import { observer } from "mobx-react";
import TextAreaField from "../../../UiKit/TextAreaField/TextAreaField";
import { useLoadingState } from "../../../hooks/useLoadingState";
import CategoryDropdown from "../../CategoryDropdown/CategoryDropdown";

const EditTask: FC<EditTaskProps> = ({ task, isOpen, onClose }) => {
  const [taskName, setTaskName] = useState<string>(task.name);
  const [taskDescription, setTaskDescription] = useState<string>(
    task.description
  );
  const [categoryId, setCategoryId] = useState<number>(task.categoryId);
  const [isTaskNameValid, setIsTaskNameValid] = useState<boolean>(true);
  const [isTaskDescriptionValid, setIsTaskDescriptionValid] =
    useState<boolean>(true);
  const [isDiasbled, setIsDisabled] = useState<boolean>(true);
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    if (isOpen) {
      setTaskName(task.name);
      setTaskDescription(task.description);
      setCategoryId(task.categoryId);
      setIsTaskNameValid(true);
      setIsTaskDescriptionValid(true);
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsDisabled(isLoading || !isTaskDescriptionValid || !isTaskNameValid);
  }, [isLoading, isTaskDescriptionValid, isTaskNameValid]);

  const handleEditTask = async () => {
    setIsLoading(true);
    try {
      const editTask: Task = {
        id: task.id,
        name: taskName,
        description: taskDescription,
        categoryId: categoryId,
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
    setIsTaskNameValid(!!value.trim() && value.length <= 255);
  };

  const handleCategorySelect = (selectedCategory: Category) => {
    setCategoryId(selectedCategory.id);
  };

  const handleTaskDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTaskDescription(value);
    setIsTaskDescriptionValid(value.length <= 1536);
  };

  return (
    <MainPopup
      isOpened={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      exdentFooterContent={
        !error ? null : <div className={styles.modal_error}>{error}</div>
      }
      isDisabled={isDiasbled}
      isLoading={isLoading}
      onSubmit={handleEditTask}
      title="Редактирование задачи"
    >
      <div>
        <div className={styles.item_row}>
          <RequiredField
            value={taskName}
            isValueValid={isTaskNameValid}
            onChange={handleTaskNameChange}
            placeholder="Введите имя задачи"
            styleClassValid={styles.required_field_task}
            styleClassInvalid={styles.required_field_task_invalid}
            errorMessage="Это поле обязательное"
          />
          <div className={styles.input_box}>
            <label htmlFor="taskCategory">Категория</label>
            <CategoryDropdown
              selectedCategory={categoryStore.getCategory(categoryId)}
              onCategorySelect={handleCategorySelect}
            />
          </div>
        </div>
        <TextAreaField
          value={taskDescription}
          isValueValid={isTaskDescriptionValid}
          onChange={handleTaskDescriptionChange}
          placeholder="Введите описание"
          errorMessage="Описание должно быть меньшне 1536"
        />
      </div>
    </MainPopup>
  );
};

export default observer(EditTask);
