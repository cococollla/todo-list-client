import { ChangeEvent } from "react";

interface InputProps {
  value: string | undefined;
  onValueChange: (value: ChangeEvent<HTMLInputElement>) => void;
  placeholderValue: string;
  isValueValid: boolean;
  styleClassValid: string;
  styleClassInvalid: string;
}

export default InputProps;
