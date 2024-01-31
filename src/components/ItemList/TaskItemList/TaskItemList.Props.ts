import Category from "../../../interfaces/Category";
import Task from "../../../interfaces/Task";

interface TaskItemListProps {
  data: Task;
  onDelete: (value: Task) => void;
  onEdit: (value: Task) => void;
}

export default TaskItemListProps;
