import { ReactNode } from "react";

interface OverlayingPopupProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export default OverlayingPopupProps;
