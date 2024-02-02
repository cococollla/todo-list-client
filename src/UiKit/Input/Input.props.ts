import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  styleClassValid: string;
  styleClassInvalid: string;
  errorMessage: string | null;
  helperText?: string;
}

export default InputProps;
