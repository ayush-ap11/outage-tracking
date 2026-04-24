"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, Menu, ShieldCheck, X, Zap } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import MobileMenu from "./MobileMenu";

type NavLink = {
  href: string;
  label: string;
  chip?: string;
  adminOnly?: boolean;
};

const BASE_LINKS: NavLink[] = [
  { href: "/map", label: "Map" },
  { href: "/history", label: "History" },
];

export interface NavbarProps {
  onNotificationClick: () => void;
}

export default function Navbar({ onNotificationClick }: NavbarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks =
    user?.role === "admin"
      ? [
          BASE_LINKS[0],
          { href: "/admin/dashboard", label: "Dashboard", chip: "ADMIN" },
          BASE_LINKS[1],
        ]
      : BASE_LINKS;

  const truncatedPhone = user?.phone
    ? `${user.phone.slice(0, 3)}***${user.phone.slice(-2)}`
    : "";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 border-b border-[#e2e8f0] bg-[#f8fafc]/95 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-black/10" : ""}`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex cursor-pointer items-center gap-2">
          <Zap className="text-[#3b82f6]" size={24} />
          <div>
            <span className="font-mono text-lg font-bold tracking-wider text-[#0f172a] text-glow">
              Urja System
            </span>
            <div className="-mt-0.5 flex items-center gap-2">
              <p className="text-xs text-[#475569]">Pune Outage Tracker</p>
              {user?.role === "admin" ? (
                <span className="rounded-full border border-red-500/30 bg-red-500/20 px-2 py-0.5 font-mono text-[10px] text-red-600">
                  ADMIN MODE
                </span>
              ) : null}
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex cursor-pointer items-center gap-1 pb-1 text-sm transition-colors duration-200 ${
                  active
                    ? link.href === "/admin/dashboard"
                      ? "border-b border-red-600 text-red-600"
                      : "border-b border-[#3b82f6] text-[#3b82f6]"
                    : link.href === "/admin/dashboard"
                      ? "text-red-600 hover:text-red-700"
                      : "text-[#475569] hover:text-[#0f172a]"
                }`}
              >
                {link.label}
                {link.chip ? (
                  <span className="rounded-full border border-red-400/40 bg-red-500/10 px-1.5 py-0.5 text-[9px] font-mono text-red-700">
                    {link.chip}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNotificationClick}
            type="button"
            className="relative cursor-pointer top-4 text-xl text-[#475569] transition-colors hover:text-[#0f172a]"
          >
            <Bell size={28} />
            <span className="live-dot absolute -top-11 -right-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
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
                <button
                  onClick={logout}
                  type="button"
                  className="cursor-pointer rounded border border-red-500/30 px-2 py-1 text-xs text-red-600 transition-colors hover:bg-red-500/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="rounded-lg bg-[#2563eb] px-4 py-1.5 text-sm text-white transition-colors hover:bg-[#3b82f6]"
              >
                Login
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
            className={`cursor-pointer text-xl text-[#475569] transition-transform duration-300 hover:text-[#0f172a] md:hidden ${mobileOpen ? "rotate-90" : "rotate-0"}`}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #2563eb, transparent)",
        }}
      />

      {mobileOpen && (
        <MobileMenu
          links={navLinks}
          pathname={pathname}
          user={user}
          truncatedPhone={truncatedPhone}
          onLogout={logout}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </nav>
  );
}
