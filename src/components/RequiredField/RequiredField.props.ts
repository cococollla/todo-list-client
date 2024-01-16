import { ChangeEvent } from "react";

interface RequiredFieldProps {
  value: string | undefined;
  onValueChange: (value: ChangeEvent<HTMLInputElement>) => void;
  placeholderValue: string;
  isValueValid: boolean;
}

export default RequiredFieldProps;
