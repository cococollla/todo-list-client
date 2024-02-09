import { useState, useEffect, ChangeEvent, FC } from "react";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import RequiredField from "../../../UiKit/Input/Input";
import { TaskDto } from "../../../interfaces/TaskDto";
import taskStore from "../../../store/TaskStore";
import styles from "./CreateTask.module.css";
import categoryStore from "../../../store/CategoryStore";
import { observer } from "mobx-react";
import TextAreaField from "../../../UiKit/TextAreaField/TextAreaField";
import { useLoadingState } from "../../../hooks/useLoadingState";
import CategoryDropdown from "../../CategoryDropdown/CategoryDropdown";
import CreateTaskProps from "./CreateTask.props";
import { Option } from "../../../UiKit/DropdownList/DropdownList.props";
import Category from "../../../interfaces/Category";
import { Status } from "../../../UiKit/Input/Input.props";

const CreateTask: FC<CreateTaskProps> = ({ isOpen, onClose }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [errorInput, setErrorInput] = useState<Status | undefined>("error");
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
      setErrorInput("error");
      setErrorMessageTextArea(null);
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsDisabled(
      isLoading || errorInput !== undefined || errorMessageTextArea !== null
    );
  }, [isLoading, errorInput, errorMessageTextArea]);

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

export default observer(CreateTask);
