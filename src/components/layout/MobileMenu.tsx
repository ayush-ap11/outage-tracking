"use client";

import Link from "next/link";
import type { AuthContextValue } from "@/lib/authContext";

export interface MobileMenuLink {
  href: string;
  label: string;
  chip?: string;
}

export interface MobileMenuProps {
  links: MobileMenuLink[];
  pathname: string;
  user: AuthContextValue["user"];
  truncatedPhone: string;
  onLogout: () => void;
  onClose: () => void;
}

export default function MobileMenu({
  links,
  pathname,
  user,
  truncatedPhone,
  onLogout,
  onClose,
}: MobileMenuProps) {
  return (
    <div className="space-y-3 border-b border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 md:hidden">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className={`flex cursor-pointer items-center justify-between py-2 text-sm transition-colors ${
            pathname === link.href
              ? link.href === "/admin/dashboard"
                ? "text-red-600"
                : "text-[#3b82f6]"
              : link.href === "/admin/dashboard"
                ? "text-red-600 hover:text-red-700"
                : "text-[#475569] hover:text-[#0f172a]"
          }`}
        >
          <span>{link.label}</span>
          {link.chip ? (
            <span className="rounded-full border border-red-500/30 bg-red-500/20 px-1.5 py-0.5 text-[9px] font-mono text-red-700">
              {link.chip}
            </span>
          ) : null}
        </Link>
      ))}

      <div className="border-t border-[#e2e8f0] pt-3">
        {user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-[#475569]">
                {truncatedPhone}
              </span>
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                  user.role === "admin"
                    ? "border-blue-400/40 bg-blue-600/30 text-blue-700"
                    : "border-green-400/40 bg-green-600/30 text-green-700"
                }`}
              >
                {user.role}
              </span>
            </div>
            <button
              onClick={onLogout}
              type="button"
              className="cursor-pointer rounded border border-red-500/30 px-2 py-1 text-xs text-red-600 transition-colors hover:bg-red-500/10"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/auth"
            onClick={onClose}
            className="block cursor-pointer rounded-lg bg-[#2563eb] px-4 py-2 text-center text-sm text-white transition-colors hover:bg-[#3b82f6]"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
