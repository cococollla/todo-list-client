export interface DropDownProps<T> {
  selectedOption: Option<T> | undefined;
  onSelect: (option: Option<T>) => void;
  options: Option<T>[];
  selectMessage: string;
}

export type Option<T> = {
  value: T;
  name: string;
};
