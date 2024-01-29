import { FC, useEffect, useState } from "react";
import DeleteCategoryProps from "./DeletePopup.props";
import styles from "./DeletePopup.module.css";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import ModalStore from "../../../store/ModalStore";
import categoryStore from "../../../store/CategoryStore";
import { useLoadingState } from "../../../hooks/useLoadingState";
import Category from "../../../interfaces/Category";
import Task, { isTask } from "../../../interfaces/Task";
import taskStore from "../../../store/TaskStore";

const DeletePopup: FC<DeleteCategoryProps<Category | Task>> = ({
  data,
  title,
}) => {
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    setError(null);
  }, []);

  const handleDelte = async () => {
    setIsLoading(true);
    try {
      const successful = isTask(data)
        ? await taskStore.deleteTask(data.id)
        : await categoryStore.deleteCategory(data.id);
      successful
        ? ModalStore.setModalIsOpen(false, "deleteConfirm")
        : setError("Произошла ошибка при удалении");
    } catch {
      setError("Произошла ошибка при удалении");
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <MainPopup
      onClose={() => ModalStore.setModalIsOpen(false, "deleteConfirm")}
      buttonText="Да"
      error={error}
      isDisabled={false}
      isLoading={isLoading}
      onSubmit={handleDelte}
      title={title}
    >
      <div className={styles.msg_delete}>
        Вы уверены, что хотите удалить{" "}
        {isTask(data) ? `задачу ${data.name}` : `категорию ${data.name}`}?
      </div>
    </MainPopup>
  );
};

export default DeletePopup;
