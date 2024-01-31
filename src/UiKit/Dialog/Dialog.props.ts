import { ReactNode } from "react";

interface DialogProps {
  isOpened: boolean;
  onClose: () => void;
  text: string;
  title: string;
  primaryButtonText: string;
  primaryButtonOnClick: () => void;
  secondaryButtonText: string;
  secondaryButtonOnClick: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  extraContent?: ReactNode;
}

export default DialogProps;
