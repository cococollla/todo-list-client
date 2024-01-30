import Category from "../../../interfaces/Category";
import Task from "../../../interfaces/Task";

interface TaskItemListProps {
  data: Task;
  onHandleDelete: (value: Task) => void;
  onHandleEdit: (value: Task) => void;
}

export default TaskItemListProps;
