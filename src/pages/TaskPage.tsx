import { useEffect, useState } from "react";
import Task from "../interfaces/Task";
import TaskList from "../components/TaskList/TaskList";
import ModalStore from "../store/ModalStore";
import CreateTask from "../components/Task/CreateTask/CreateTask";
import DeleteTask from "../components/Task/DeleteTask/DeleteTask";
import EditTask from "../components/Task/EditTask/EditTask";
import { observer } from "mobx-react";
import taskStore from "../store/TaskStore";
import categoryStore from "../store/CategoryStore";

const TaskPage = () => {
  const [selectedTask, setSelectedTask] = useState<Task>({
    id: 0,
    name: "",
    description: "",
    categoryId: 0,
  });
  useEffect(() => {
    taskStore.fetchTasks();
    categoryStore.fetchCategories();
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
      {ModalStore.modalIsOpen && ModalStore.modalType === "deleteTask" && (
        <DeleteTask task={selectedTask} />
      )}
    </div>
  );
};

export default observer(TaskPage);
