import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  buttonText: string;
  contentComponent: ReactNode;
  onCreateTask: () => void;
}

export default ModalProps;
