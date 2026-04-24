import type { ReactNode } from "react";

const VARIANTS = {
  reported: "bg-red-100 text-red-700 border border-red-200",
  acknowledged: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  in_progress: "bg-blue-100 text-blue-700 border border-blue-200",
  resolved: "bg-green-100 text-green-700 border border-green-200",
  warning: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  muted: "bg-gray-100 text-gray-700 border border-gray-200",
  planned: "bg-blue-100 text-blue-700 border border-blue-200",
  unplanned: "bg-red-100 text-red-700 border border-red-200",
  admin: "bg-blue-100 text-blue-800 border border-blue-200",
  citizen: "bg-green-100 text-green-800 border border-green-200",
  default: "bg-gray-100 text-gray-700 border border-gray-200",
} as const;

export interface BadgeProps {
  variant?: string;
  children: ReactNode;
  className?: string;
}

export default function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  const base =
    "px-2 py-0.5 rounded-full text-xs font-mono font-medium uppercase tracking-wider inline-block";
  const variantClass =
    VARIANTS[variant as keyof typeof VARIANTS] || VARIANTS.default;

  return (
    <span className={`${base} ${variantClass} ${className}`}>{children}</span>
  );
}
