import { ChangeEvent, TextareaHTMLAttributes } from "react";

interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  isValueValid: boolean;
  errorMessage: string;
}

export default TextAreaFieldProps;
