import { useEffect, useState } from "react";
import styles from "./TaskList.module.css";
import Task from "../../interfaces/Task";
import taskStore from "../../store/TaskStore";
import { observer } from "mobx-react";
import EditTask from "../Task/EditTask/EditTask";
import TaskStore from "../../store/TaskStore";
import Dialog from "../../UiKit/Dialog/Dialog";
import { useLoadingState } from "../../hooks/useLoadingState";
import ItemList from "../ItemList/ItemList";
import CategoryName from "../CategoryName/CategoryName";

export const TaskList = ({}) => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task>({
    id: 0,
    name: "",
    description: "",
    categoryId: 0,
  });
  const [isDiasbled, setIsDisabled] = useState<boolean>(false);
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    if (!deleteModalOpen) {
      setError(null);
    }
  }, [deleteModalOpen]);

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    setDeleteModalOpen(true);
  };
  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const handleDelte = async () => {
    setIsLoading(true);
    setIsDisabled(true);
    try {
      const successful = await TaskStore.deleteTask(selectedTask.id);
      successful
        ? setDeleteModalOpen(false)
        : setError("Произошла ошибка при удалении");
    } catch {
      setError("Произошла ошибка при удалении");
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  return (
    <>
      {taskStore.tasks.length === 0 ? (
        <div className={styles.error}>Не удалось загрузить список задач</div>
      ) : (
        taskStore.tasks.map((task) => (
          <ItemList
            key={task.id}
            data={task}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
            extendTitle={<CategoryName categoryId={task.categoryId} />}
          />
        ))
      )}
      <EditTask
        task={selectedTask}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      />

      <Dialog
        isOpened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        primaryButtonText="Да"
        secondaryButtonText="Закрыть"
        primaryButtonOnClick={handleDelte}
        secondaryButtonOnClick={() => setDeleteModalOpen(false)}
        text={`Вы уверены, что хотите удалить задачу ${selectedTask.name}?`}
        title="Удаление задачи"
        isDisabled={isDiasbled}
        isLoading={isLoading}
        extraContent={
          !error ? null : <div className={styles.error_modal}>{error}</div>
        }
      />
    </>
  );
};

export default observer(TaskList);
