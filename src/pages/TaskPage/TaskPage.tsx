import { FC, useState } from "react";
import Task from "../../interfaces/Task";
import TaskList from "../../components/TaskList/TaskList";
import CreateTask from "../../components/Task/CreateTask/CreateTask";
import EditTask from "../../components/Task/EditTask/EditTask";
import { observer } from "mobx-react";
import DeletePopup from "../../components/ConfirmPopup/DeletePopup/DeletePopup";
import TaskPageProps from "./TaskPageProps";

const TaskPage: FC<TaskPageProps> = ({ isOpen, onClose }) => {
  const [editTaskModalOpen, setEditTaskModalOpen] = useState<boolean>(false);
  const [deletModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task>({
    id: 0,
    name: "",
    description: "",
    categoryId: 0,
  });

  return (
    <div>
      <TaskList
        setSelectedTask={setSelectedTask}
        setEditModalOpen={setEditTaskModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
      />

      {<CreateTask isOpen={isOpen} onClose={() => onClose(false)} />}

      {
        <EditTask
          task={selectedTask}
          isOpen={editTaskModalOpen}
          onClose={() => setEditTaskModalOpen(false)}
        />
      }

      {
        <DeletePopup
          data={selectedTask}
          title={"Удаление задачи"}
          isOpen={deletModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />
      }
    </div>
  );
};

export default observer(TaskPage);
