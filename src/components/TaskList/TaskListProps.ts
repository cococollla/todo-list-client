import Task from "../../interfaces/Task";

interface TaskListProps {
  setSelectedTask: (task: Task) => void;
  setEditModalOpen: (value: boolean) => void;
  setDeleteModalOpen: (value: boolean) => void;
}

export default TaskListProps;
