import Task from "../../../interfaces/Task";

interface EditTaskProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export default EditTaskProps;
