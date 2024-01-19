import { ChangeEvent } from "react";

interface RequiredFieldProps {
  value: string | undefined;
  onValueChange: (value: ChangeEvent<HTMLInputElement>) => void;
  placeholderValue: string;
  isValueValid: boolean;
  styleClassValid: string;
  styleClassInvalid: string
}

export default RequiredFieldProps;
