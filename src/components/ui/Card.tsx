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
    "bg-[#ffffff] border border-[#e2e8f0] rounded-xl transition-all duration-200 overflow-hidden";

  const interactive = onClick
    ? "cursor-pointer hover:border-[#2563eb]/40 hover:bg-[#e2e8f0]"
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
