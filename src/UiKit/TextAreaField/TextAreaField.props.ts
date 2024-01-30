import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

interface TextAreaFieldProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  value: string;
  isValueValid: boolean;
  errorMessage: string;
}

export default TextAreaFieldProps;
