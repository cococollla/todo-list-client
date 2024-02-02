import { useState, useEffect, ChangeEvent, ReactNode, FC } from "react";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import RequiredField from "../../../UiKit/Input/Input";
import Category from "../../../interfaces/Category";
import { TaskDto } from "../../../interfaces/TaskDto";
import taskStore from "../../../store/TaskStore";
import styles from "./CreateTask.module.css";
import categoryStore from "../../../store/CategoryStore";
import { observer } from "mobx-react";
import TextAreaField from "../../../UiKit/TextAreaField/TextAreaField";
import { useLoadingState } from "../../../hooks/useLoadingState";
import CategoryDropdown from "../../CategoryDropdown/CategoryDropdown";
import CreateTaskProps from "./CreateTask.props";

const CreateTask: FC<CreateTaskProps> = ({ isOpen, onClose }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [errorMessageInput, setErrorMessageInput] = useState<string | null>(
    "Это поле обязательное"
  );
  const [errorMessageTextArea, setErrorMessageTextArea] = useState<
    string | null
  >(null);
  const [isDiasbled, setIsDisabled] = useState<boolean>(true);
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    if (isOpen) {
      setTaskName("");
      setTaskDescription("");
      setCategoryId(0);
      setErrorMessageInput("Это поле обязательное");
      setErrorMessageTextArea(null);
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsDisabled(
      isLoading || errorMessageInput !== null || errorMessageTextArea !== null
    );
  }, [isLoading, errorMessageInput, errorMessageTextArea]);

  const handleCreateTask = async () => {
    setIsLoading(true);
    try {
      const newTask: TaskDto = {
        name: taskName,
        description: taskDescription,
        categoryId: Number(categoryId),
      };

      await taskStore.addTask(newTask);
      onClose();
    } catch (error) {
      setError("Ошибка при создании задачи");
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
      setErrorMessageInput(null);
    } else if (isEmpty && !isLengthValid) {
      setErrorMessageInput("Длина должна быть меньше 255 символов");
    } else {
      setErrorMessageInput("Это поле обязательное");
    }
  };

  const handleCategorySelect = (selectedCategory: Category) => {
    setCategoryId(selectedCategory.id);
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
      buttonText="Создать"
      exdentFooterContent={
        !error ? null : <div className={styles.modal_error}>{error}</div>
      }
      isDisabled={isDiasbled}
      isLoading={isLoading}
      onSubmit={handleCreateTask}
      title="Создание задачи"
    >
      <div>
        <div className={styles.item_row}>
          <RequiredField
            value={taskName}
            onChange={handleTaskNameChange}
            placeholder="Введите имя задачи"
            styleClassValid={styles.required_field_task}
            styleClassInvalid={styles.required_field_task_invalid}
            errorMessage={errorMessageInput}
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
          onChange={handleTaskDescriptionChange}
          placeholder="Введите описание"
          errorMessage={errorMessageTextArea}
        />
      </div>
    </MainPopup>
  );
};

export default observer(CreateTask);
