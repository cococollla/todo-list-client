import Task from "../../../interfaces/Task";

interface DeleteTaskProps {
  task: Task;
  onDeleteTask: (task: Task) => void;
}

export default DeleteTaskProps;
