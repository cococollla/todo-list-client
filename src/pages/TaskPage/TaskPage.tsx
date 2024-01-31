import { FC } from "react";
import TaskList from "../../components/TaskList/TaskList";
import CreateTask from "../../components/Task/CreateTask/CreateTask";
import { observer } from "mobx-react";
import TaskPageProps from "./TaskPageProps";

const TaskPage: FC<TaskPageProps> = ({ isOpen, onClose }) => {
  return (
    <div>
      <TaskList />
      <CreateTask isOpen={isOpen} onClose={() => onClose(false)} />
    </div>
  );
};

export default observer(TaskPage);
