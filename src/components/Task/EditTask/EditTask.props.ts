import Task from "../../../interfaces/Task";

interface EditTaskProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export default EditTaskProps;
