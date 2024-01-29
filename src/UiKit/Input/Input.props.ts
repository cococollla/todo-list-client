import { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string | undefined;
  isValueValid: boolean;
  styleClassValid: string;
  styleClassInvalid: string;
  errorMessage: string;
}

export default InputProps;
