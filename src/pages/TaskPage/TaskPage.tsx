import { FC, useState } from "react";
import TaskList from "../../components/TaskList/TaskList";
import CreateTask from "../../components/Task/CreateTask/CreateTask";
import { observer } from "mobx-react";
import TaskPageProps from "./TaskPageProps";
import Header from "../../components/Header/Header";

const TaskPage = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);

  return (
    <div>
      <Header
        activeModal={
          <div onClick={() => setCreateModalOpen(true)}>Создать задачу</div>
        }
      />
      <TaskList />
      <CreateTask
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
};

export default observer(TaskPage);
