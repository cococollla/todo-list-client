import { useState, useEffect, ChangeEvent, ReactNode } from "react";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import RequiredField from "../../../UiKit/Input/Input";
import Category from "../../../interfaces/Category";
import { TaskDto } from "../../../interfaces/TaskDto";
import taskStore from "../../../store/TaskStore";
import styles from "./CreateTask.module.css";
import ModalStore from "../../../store/ModalStore";
import categoryStore from "../../../store/CategoryStore";
import { observer } from "mobx-react";
import TextAreaField from "../../../UiKit/TextAreaField/TextAreaField";
import { useLoadingState } from "../../../hooks/useLoadingState";
import CategoryDropdown from "../../CategoryDropdown/CategoryDropdown";

const CreateTask = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [isTaskNameValid, setIsTaskNameValid] = useState<boolean>(false);
  const [isTaskDescriptionValid, setIsTaskDescriptionValid] =
    useState<boolean>(true);
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    if (ModalStore.modalIsOpen && ModalStore.modalType === "createTask") {
      setTaskName("");
      setTaskDescription("");
      setCategoryId(0);
      setIsTaskNameValid(false);
      setError(null);
    }
  }, [ModalStore.modalIsOpen, ModalStore.modalType]);

  const handleCreateTask = async () => {
    setIsLoading(true);
    try {
      const newTask: TaskDto = {
        name: taskName,
        description: taskDescription,
        categoryId: Number(categoryId),
      };

      const id = await taskStore.addTask(newTask);
      id && ModalStore.setModalIsOpen(false, "createTask");
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

  const handleTaskDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTaskDescription(value);
    setIsTaskDescriptionValid(value.length <= 1536);
  };

  return (
    <MainPopup
      onClose={() => ModalStore.setModalIsOpen(false, "createTask")}
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

export default observer(CreateTask);
