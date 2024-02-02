import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  styleClassValid: string;
  styleClassInvalid: string;
  errorMessage?: string;
  helperText?: string;
}

export default InputProps;
