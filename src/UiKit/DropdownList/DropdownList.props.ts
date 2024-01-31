interface DropDownProps<T extends { id: number; name: string }> {
  selectedOption: T | undefined;
  onSelect: (option: T) => void;
  options: T[];
  selectMessage: string;
}

export default DropDownProps;
