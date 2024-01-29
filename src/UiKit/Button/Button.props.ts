import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "primary" | "secondary";
  buttonText: string;
  isLoading: boolean;
}

export default ButtonProps;
