"use client";

import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

export interface NotificationItem {
  id: number;
  icon: string;
  title: string;
  sub: string;
  time: string;
  unread: boolean;
}

export interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    icon: "AlertCircle",
    title: "New outage reported in Koregaon Park",
    sub: "Unplanned outage — 14 confirmations",
    time: "2 minutes ago",
    unread: true,
  },
  {
    id: 2,
    icon: "CheckCircle",
    title: "Power restored in Kothrud",
    sub: "Outage resolved after 3 hours",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    icon: "Info",
    title: "Scheduled maintenance tomorrow",
    sub: "Hinjawadi — 9 AM to 2 PM",
    time: "3 hours ago",
    unread: false,
  },
];

export default function NotificationPanel({
  isOpen,
  onClose,
}: NotificationPanelProps) {
  return (
    <div
      className={`fixed top-16 right-0 h-[calc(100vh-64px)] w-80 border-l border-[#1e2a3a] bg-[#0f0f1a] z-40 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-[#1e2a3a] px-4 py-3">
        <h3 className="text-sm font-semibold text-white">Notifications</h3>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="cursor-pointer text-[10px] text-[#3b82f6] transition-colors hover:text-blue-300"
          >
            Mark all read
          </button>
          <button
            onClick={onClose}
            type="button"
            className="cursor-pointer text-lg leading-none text-[#94a3b8] transition-colors hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="h-[calc(100%-100px)] overflow-y-auto">
        {NOTIFICATIONS.map((notification) => (
          <div
            key={notification.id}
            className={`cursor-pointer border-b border-[#1e2a3a]/50 px-4 py-3 transition-colors hover:bg-[#1a1a2e] ${
              notification.unread ? "bg-[#1a1a2e]/60" : ""
            }`}
          >
            <div className="flex gap-3">
              {notification.icon === "AlertCircle" ? (
                <AlertCircle className="mt-0.5 text-[#f59e0b]" size={18} />
              ) : notification.icon === "CheckCircle" ? (
                <CheckCircle className="mt-0.5 text-[#22c55e]" size={18} />
              ) : (
                <Info className="mt-0.5 text-[#60a5fa]" size={18} />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-tight text-white">
                  {notification.title}
                </p>
                <p className="mt-0.5 text-xs text-[#64748b]">
                  {notification.sub}
                </p>
                <p className="mt-1 text-[10px] text-[#475569]">
                  {notification.time}
                </p>
              </div>
              {notification.unread && (
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#3b82f6]" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-[#1e2a3a] px-4 py-3">
        <p className="text-center text-[10px] italic text-[#475569]">
          Push notifications coming in v2
        </p>
      </div>
    </div>
  );
}
