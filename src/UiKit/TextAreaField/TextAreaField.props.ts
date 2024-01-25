import { ChangeEvent } from "react";

interface TextAreaFieldProps {
  value: string;
  isValueValid: boolean;
  onValueChange: (value: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholderValue: string;
}

export default TextAreaFieldProps;
