import { FC, useEffect, useState, ChangeEvent } from "react";
import EditTaskProps from "./EditTask.props";
import Modal from "../../Modal/Modal";
import Task from "../../../interfaces/Task";
import styles from "../../Modal/Modal.module.css";
import RequiredFiled from "../../Input/Input";
import CategoryDropdown from "../../CategoryDropdown/CategoryDropdown";
import categoryStore from "../../../store/CategoryStore";
import Category from "../../../interfaces/Category";

const EditTask: FC<EditTaskProps> = ({ isOpen, onClose, task, onEditTask }) => {
  const [taskName, setTaskName] = useState<string>(task.name.toString());
  const [taskDescription, setTaskDescription] = useState<string>(
    task.description.toString()
  );
  const [categoryId, setCategoryId] = useState<number>(task.categoryId);
  const [isTaskNameValid, setIsTaskNameValid] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setTaskName(task.name);
      setTaskDescription(task.description);
      setCategoryId(task.categoryId);
      setIsTaskNameValid(true);
    }
  }, [isOpen]);

  const handleEditTask = () => {
    const editTask: Task = {
      name: taskName,
      description: taskDescription,
      categoryId: categoryId,
      id: task.id,
    };

    onEditTask(editTask);
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
      title="Редактирование задачи"
      buttonText="Сохранить"
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
      }
      onCreateTask={() => handleEditTask()}
      isCreateTaskDisabled={!isTaskNameValid}
      isLoading={null}
      error={null}
    />
  );
};

export default EditTask;
