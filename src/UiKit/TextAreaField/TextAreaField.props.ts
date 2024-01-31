import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

interface TextAreaFieldProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  isValueValid: boolean;
  errorMessage: string;
}

export default TextAreaFieldProps;
