import { ReactNode } from "react";

interface MainPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  children: ReactNode;
  onSubmit: () => void;
  isDisabled: boolean;
  isLoading: boolean;
  error: string | null;
}

export default MainPopupProps;
