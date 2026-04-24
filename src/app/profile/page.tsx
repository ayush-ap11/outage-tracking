"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Zap } from "lucide-react";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import OutageCard from "@/components/outage/OutageCard";
import { useAuth } from "@/lib/authContext";
import useOutages from "@/hooks/useOutages";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { outages } = useOutages();
  const [editMode, setEditMode] = useState(false);
  const [consumerId, setConsumerId] = useState(user?.consumerId || "");
  const [consumerIdInput, setConsumerIdInput] = useState(consumerId);
  const [reportFilter, setReportFilter] = useState<
    "all" | "active" | "resolved"
  >("all");
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const myReports = outages.filter(
    (outage) => outage.reportedBy === user?.phone,
  );
  const visibleReports = myReports.filter(
    (outage) =>
      reportFilter === "all" ||
      (reportFilter === "resolved"
        ? outage.status === "resolved"
        : outage.status !== "resolved"),
  );

  return (
    <ProtectedRoute>
      <div className="animate-fade-in min-h-[calc(100vh-64px)] bg-[#0a0a0f] p-4 lg:p-6">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => router.back()}
            type="button"
            className="cursor-pointer text-2xl text-[#94a3b8] transition hover:text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="mt-2 font-mono text-2xl font-bold text-white">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-[#475569]">
            Manage your account details
          </p>

          <div className="mt-5 flex flex-col gap-5 lg:flex-row">
            <div className="w-full shrink-0 lg:w-80">
              <Card
                glowing
                className="animate-fade-in-scale text-center opacity-0"
              >
                <div className="animate-pulse-glow mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#2563eb] bg-[#1a1a2e] text-3xl text-[#60a5fa]">
                  <User size={40} />
                </div>
                <div className="mt-3 font-mono text-lg font-bold text-white">
                  {user?.phone}
                </div>
                <div className="mt-1 flex justify-center">
                  <Badge variant={user?.role || "citizen"}>{user?.role}</Badge>
                </div>
              </Card>

              <Card className="mt-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#475569]">
                    Consumer ID
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setConsumerIdInput(consumerId);
                      setEditMode((value) => !value);
                    }}
                  >
                    {editMode ? "Close" : "Edit"}
                  </Button>
                </div>
                <div className="overflow-hidden transition-all duration-300">
                  {editMode ? (
                    <div className="space-y-3">
                      <input
                        value={consumerIdInput}
                        onChange={(e) => setConsumerIdInput(e.target.value)}
                        placeholder="Enter your MSEDCL Consumer ID"
                        className="w-full rounded-lg border border-[#1e2a3a] bg-[#0f0f1a] px-4 py-3 font-mono text-sm text-white placeholder-[#475569] focus:border-[#2563eb] focus:outline-none"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setConsumerId(consumerIdInput.trim());
                            setEditMode(false);
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : consumerId ? (
                    <div className="font-mono text-sm text-[#60a5fa]">
                      {consumerId}
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm italic text-[#475569]">
                        Not set
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => setEditMode(true)}
                      >
                        Add Consumer ID
                      </Button>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="mt-4">
                <div className="mb-3 text-xs font-mono uppercase tracking-widest text-[#475569]">
                  Account Info
                </div>
                {[
                  ["Phone", user?.phone],
                  [
                    "Role",
                    <Badge key="role" variant={user?.role || "citizen"}>
                      {user?.role}
                    </Badge>,
                  ],
                  ["Member Since", "April 2026"],
                  ["Reports Submitted", String(myReports.length)],
                ].map(([label, value], index) => (
                  <div
                    key={String(label)}
                    className={`flex items-center justify-between py-2 ${index < 3 ? "border-b border-[#1e2a3a]" : ""}`}
                  >
                    <span className="text-sm text-[#475569]">{label}</span>
                    <span className="font-mono text-sm font-bold text-white">
                      {value as any}
                    </span>
                  </div>
                ))}
              </Card>

              <Button
                variant={logoutConfirm ? "danger" : "ghost"}
                className="mt-4 w-full justify-center"
                onClick={() => {
                  if (logoutConfirm) {
                    logout();
                    router.push("/auth");
                  } else {
                    setLogoutConfirm(true);
                  }
                }}
              >
                {logoutConfirm ? "Confirm Logout?" : "Logout"}
              </Button>
            </div>

            <div className="flex-1">
              <div className="font-mono text-base font-semibold text-white">
                My Reports ({myReports.length})
              </div>
              <div className="mt-2 mb-4 flex gap-2">
                {(["all", "active", "resolved"] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setReportFilter(item)}
                    className={`rounded-lg px-4 py-2 font-mono text-sm transition ${reportFilter === item ? "bg-[#2563eb] text-white" : "border border-[#1e2a3a] bg-[#13131f] text-[#94a3b8]"}`}
                  >
                    {item === "all"
                      ? "All"
                      : item === "active"
                        ? "Active"
                        : "Resolved"}
                  </button>
                ))}
              </div>

              {visibleReports.length === 0 ? (
                <Card className="py-16 text-center">
                  <Zap
                    className="animate-pulse-slow mb-2 text-[#3b82f6]"
                    size={40}
                  />
                  <div className="font-mono text-white">No reports yet</div>
                  <div className="mt-1 text-sm text-[#475569]">
                    Be the first to report an outage in your area
                  </div>
                  <Button
                    className="mt-4"
                    onClick={() => router.push("/report")}
                  >
                    Report Outage
                  </Button>
                </Card>
              ) : (
                visibleReports.map((outage, index) => (
                  <div
                    key={outage.id}
                    className="animate-slide-in-right opacity-0"
                    style={{ animationDelay: `${Math.min(index * 80, 400)}ms` }}
                  >
                    <div className="relative mb-3">
                      <div className="absolute right-3 top-3 z-10">
                        <Badge
                          variant="admin"
                          className="bg-[#2563eb]/20 text-[10px] text-[#60a5fa]"
                        >
                          Your Report
                        </Badge>
                      </div>
                      <OutageCard outage={outage} compact />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
