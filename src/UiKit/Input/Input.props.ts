import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  styleClassValid: string;
  styleClassInvalid: string;
  helperText?: string;
  status?: Status;
}

export type Status = "error" | "warning";
