import Task from "../../../interfaces/Task";

interface EditTaskProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onEditTask: (task: Task) => void;
}

export default EditTaskProps;
