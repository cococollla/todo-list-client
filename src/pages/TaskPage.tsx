import { useEffect, useState } from "react";
import Task from "../interfaces/Task";
import TaskList from "../components/TaskList/TaskList";
import ModalStore from "../store/ModalStore";
import CreateTask from "../components/Task/CreateTask/CreateTask";
import EditTask from "../components/Task/EditTask/EditTask";
import { observer } from "mobx-react";
import taskStore from "../store/TaskStore";
import categoryStore from "../store/CategoryStore";
import DeletePopup from "../components/ConfirmPopup/DeletePopup/DeletePopup";

const TaskPage = () => {
  const [selectedTask, setSelectedTask] = useState<Task>({
    id: 0,
    name: "",
    description: "",
    categoryId: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      await taskStore.fetchTasks();
      await categoryStore.fetchCategories();
    };

    fetchData();
  }, []);

  return (
    <div>
      <TaskList setSelectedTask={setSelectedTask} />
      {ModalStore.modalIsOpen && ModalStore.modalType === "createTask" && (
        <CreateTask />
      )}
      {ModalStore.modalIsOpen && ModalStore.modalType === "editTask" && (
        <EditTask task={selectedTask} />
      )}
      {ModalStore.modalIsOpen && ModalStore.modalType === "deleteConfirm" && (
        <DeletePopup data={selectedTask} title={"Удаление задачи"} />
      )}
    </div>
  );
};

export default observer(TaskPage);
