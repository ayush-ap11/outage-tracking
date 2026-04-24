import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

const VARIANTS = {
  primary:
    "bg-[#2563eb] hover:bg-[#3b82f6] text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]",
  outline: "border border-[#2563eb] text-[#3b82f6] hover:bg-[#2563eb]/10",
  danger: "border border-red-500 text-red-400 hover:bg-red-500/10",
  ghost: "text-[#94a3b8] hover:text-white hover:bg-white/5",
  success: "bg-green-600 hover:bg-green-500 text-white",
} as const;

const SIZES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
} as const;

export interface ButtonProps {
  variant?: string;
  size?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  href?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled,
  className = "",
  type = "button",
  href,
}: ButtonProps) {
  const base =
    "rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 inline-flex cursor-pointer items-center gap-2";
  const classes = `${base} ${VARIANTS[variant as keyof typeof VARIANTS] || VARIANTS.primary} ${SIZES[size as keyof typeof SIZES] || SIZES.md} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
