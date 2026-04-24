"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import NotificationPanel from "./NotificationPanel";

const HIDDEN_PATHS = ["/auth", "/admin/login"];

export default function NavbarWrapper() {
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);

  if (HIDDEN_PATHS.includes(pathname)) return null;

  return (
    <>
      <Navbar onNotificationClick={() => setNotifOpen((value) => !value)} />
      <NotificationPanel
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
      />
    </>
  );
}
