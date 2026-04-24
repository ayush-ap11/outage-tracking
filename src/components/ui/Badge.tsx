import type { ReactNode } from "react";

const VARIANTS = {
  reported: "bg-red-500/20 text-red-400 border border-red-500/30",
  acknowledged: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  in_progress: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  resolved: "bg-green-500/20 text-green-400 border border-green-500/30",
  warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  muted: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
  planned: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  unplanned: "bg-red-500/20 text-red-300 border border-red-500/30",
  admin: "bg-blue-600/30 text-blue-300 border border-blue-400/40",
  citizen: "bg-green-600/30 text-green-300 border border-green-400/40",
  default: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
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
