import { FC, useEffect, useState, ChangeEvent } from "react";
import EditTaskProps from "./EditTask.props";
import Task from "../../../interfaces/Task";
import styles from "./EditTask.module.css";
import RequiredField from "../../../UiKit/Input/Input";
import CategoryDropdown from "../../../UiKit/CategoryDropdown/CategoryDropdown";
import categoryStore from "../../../store/CategoryStore";
import Category from "../../../interfaces/Category";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import TaskStore from "../../../store/TaskStore";
import ModalStore from "../../../store/ModalStore";
import { observer } from "mobx-react";
import TextAreaField from "../../../UiKit/TextAreaField/TextAreaField";
import { useLoadingState } from "../../../hooks/useLoadingState";

const EditTask: FC<EditTaskProps> = ({ task }) => {
  const [taskName, setTaskName] = useState<string>(task.name);
  const [taskDescription, setTaskDescription] = useState<string>(
    task.description
  );
  const [categoryId, setCategoryId] = useState<number>(task.categoryId);
  const [isTaskNameValid, setIsTaskNameValid] = useState<boolean>(true);
  const [isTaskDescriptionValid, setIsTaskDescriptionValid] =
    useState<boolean>(true);
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    if (ModalStore.modalIsOpen && ModalStore.modalType === "editTask") {
      setTaskName(task.name);
      setTaskDescription(task.description);
      setCategoryId(task.categoryId);
      setIsTaskNameValid(true);
      setIsTaskDescriptionValid(true);
      setError(null);
    }
  }, [ModalStore.modalIsOpen, ModalStore.modalType]);

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
      id && ModalStore.setModalIsOpen(false, "editTask");
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
      onClose={() => ModalStore.setModalIsOpen(false, "editTask")}
      buttonText="Сохранить"
      error={error}
      isDisabled={!isTaskNameValid}
      isLoading={isLoading}
      onSubmit={handleEditTask}
      title="Редактирование задачи"
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
              selectedCategory={categoryStore.getCategory(categoryId)}
              onCategorySelect={handleCategorySelect}
            />
          </div>
        </div>
        <TextAreaField
          value={taskDescription}
          isValueValid={isTaskDescriptionValid}
          onValueChange={handleTaskDescriptionChange}
          placeholderValue="Введите описание"
        />
      </div>
    </MainPopup>
  );
};

export default observer(EditTask);
