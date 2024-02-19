import { ReactNode } from "react";

interface PopupFooterProps {
  primaryButtonText: string;
  primaryButtonOnClick: () => void;
  isPrimaryButtonIsDisabled: boolean;
  isLoading: boolean;
  onClose: () => void;
  exdentContent?: ReactNode;
}

export default PopupFooterProps;
