import { FC, useEffect, useState, ChangeEvent } from "react";
import EditTaskProps from "./EditTask.props";
import Task from "../../../interfaces/Task";
import styles from "./EditTask.module.css";
import RequiredField from "../../../UiKit/Input/Input";
import categoryStore from "../../../store/CategoryStore";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import TaskStore from "../../../store/TaskStore";
import { observer } from "mobx-react";
import TextAreaField from "../../../UiKit/TextAreaField/TextAreaField";
import { useLoadingState } from "../../../hooks/useLoadingState";
import CategoryDropdown from "../../CategoryDropdown/CategoryDropdown";
import { Option } from "../../../UiKit/DropdownList/DropdownList.props";
import Category from "../../../interfaces/Category";
import { Status } from "../../../UiKit/Input/Input.props";

const EditTask: FC<EditTaskProps> = ({ task, isOpen, onClose }) => {
  const [taskName, setTaskName] = useState<string>(task.name);
  const [taskDescription, setTaskDescription] = useState<string>(
    task.description
  );
  const [categoryId, setCategoryId] = useState<number>(task.categoryId);
  const [errorInput, setErrorInput] = useState<Status | undefined>(undefined);
  const [errorMessageTextArea, setErrorMessageTextArea] = useState<
    string | null
  >(null);
  const [isDiasbled, setIsDisabled] = useState<boolean>(true);
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    if (isOpen) {
      setTaskName(task.name);
      setTaskDescription(task.description);
      setCategoryId(task.categoryId);
      setErrorInput(undefined);
      setErrorMessageTextArea(null);
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsDisabled(
      isLoading || errorInput !== undefined || errorMessageTextArea !== null
    );
  }, [isLoading, errorInput, errorMessageTextArea]);

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
    const isEmpty = !!value.trim();
    const isLengthValid = value.length <= 255;
    setTaskName(value);
    if (isEmpty && isLengthValid) {
      setErrorInput(undefined);
    } else if (!isEmpty && isLengthValid) {
      setErrorInput("error");
    } else if (isEmpty && !isLengthValid) {
      setErrorInput("warning");
    }
  };

  const handleCategorySelect = (selectedCategory: Option<Category>) => {
    setCategoryId(selectedCategory.value.id);
  };

  const handleTaskDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const isLengthValid = value.length <= 1536;
    setTaskDescription(value);
    isLengthValid
      ? setErrorMessageTextArea(null)
      : setErrorMessageTextArea("Описание должно быть меньше 1536 символов");
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
            onChange={handleTaskNameChange}
            placeholder="Введите имя задачи"
            styleClassValid={styles.required_field_task}
            styleClassInvalid={styles.required_field_task_invalid}
            helperText="Это поле обязательное"
            status={errorInput}
          />
          <div className={styles.input_box}>
            <label htmlFor="taskCategory">Категория</label>
            <CategoryDropdown
              selectedCategory={
                categoryStore.getCategory(categoryId)
                  ? {
                      value: categoryStore.getCategory(categoryId)!,
                      name: categoryStore.getCategory(categoryId)!.name,
                    }
                  : undefined
              }
              onCategorySelect={handleCategorySelect}
            />
          </div>
        </div>
        <TextAreaField
          value={taskDescription}
          onChange={handleTaskDescriptionChange}
          placeholder="Введите описание"
          errorMessage={errorMessageTextArea}
        />
      </div>
    </MainPopup>
  );
};

export default observer(EditTask);
