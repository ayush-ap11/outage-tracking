import type { HTMLAttributes, MouseEventHandler, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  glowing?: boolean;
  glow?: boolean;
}

export default function Card({
  children,
  className = "",
  onClick,
  glowing,
  glow,
  ...rest
}: CardProps) {
  const base =
    "bg-[#13131f] border border-[#1e2a3a] rounded-xl transition-all duration-200";

  const interactive = onClick
    ? "cursor-pointer hover:border-[#2563eb]/40 hover:bg-[#1a1a2e]"
    : "";

  const glowClass =
    glowing || glow
      ? "shadow-[0_0_30px_rgba(37,99,235,0.15)] border-[#2563eb]/30"
      : "";

  return (
    <div
      {...rest}
      onClick={onClick}
      className={`${base} ${interactive} ${glowClass}`}
    >
      <div className={`p-4 ${className}`}>{children}</div>
    </div>
  );
}
