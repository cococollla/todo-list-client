import { ReactElement, ReactNode } from "react";

interface DropDownProps<T> {
  selectedOption: T | undefined;
  onSelect: (option: T) => void;
  options: T[];
  renderOption: (option: T) => ReactNode;
  selectMessage: string;
}

export default DropDownProps;
