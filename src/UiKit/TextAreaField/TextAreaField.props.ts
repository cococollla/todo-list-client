import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

interface TextAreaFieldProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  errorMessage: string | null;
  helperText?: string;
}

export default TextAreaFieldProps;
