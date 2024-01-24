interface PopupFooterProps {
  primaryButtonText: string;
  primaryButtonOnClick: () => void;
  isPrimaryButtonIsDisabled: boolean;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}

export default PopupFooterProps;
