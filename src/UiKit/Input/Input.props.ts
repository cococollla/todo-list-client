import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isValueValid: boolean;
  styleClassValid: string;
  styleClassInvalid: string;
  errorMessage: string;
}

export default InputProps;
