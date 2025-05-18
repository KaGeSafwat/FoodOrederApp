import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  ariaLabel?: string;
  title?: string;
};

export const Button = ({
  onClick,
  disabled,
  className,
  ariaLabel,
  children,
}: ButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={className}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);
