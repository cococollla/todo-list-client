import Task from "../../../interfaces/Task";

interface DeleteTaskProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onDeleteTask: (task: Task) => void;
}

export default DeleteTaskProps;
