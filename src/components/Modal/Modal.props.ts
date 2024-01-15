import { ReactNode } from "react";
import Task from "../../interfaces/Task";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  buttonText: string;
  contentComponent: ReactNode;
  onCreateTask: (task?: Task) => void;
  isCreateTaskDisabled: boolean;
}

export default ModalProps;
