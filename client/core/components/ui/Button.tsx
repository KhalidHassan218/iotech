"use client";
import React from "react";

import { cn } from "@/core/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "primary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  ...props
}) => {
  const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors";
  const variantStyle =
    variant === "primary" &&
    "bg-transparent border border-foreground text-foreground hover:bg-accent hover:text-on-dark";

  return (
    <button
      className={cn(baseStyle, variantStyle, "cursor-pointer")}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
