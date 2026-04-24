"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useAuth } from "@/lib/authContext";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const inputClass =
  "w-full rounded-lg border border-[#1e2a3a] bg-[#0f0f1a] px-4 py-3 font-mono text-sm text-white placeholder-[#475569] focus:border-[#2563eb] focus:outline-none";

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginWithPhone } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (phone === "admin" && password === "admin123") {
      loginWithPhone("admin");
      router.push("/admin/dashboard");
      return;
    }
    setError("Invalid credentials");
    setLoading(false);
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070b14] px-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <style jsx global>{`
        @keyframes admin-blob {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.04);
          }
        }
      `}</style>
      <div
        className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-900/40 blur-3xl"
        style={{ animation: "admin-blob 8s ease-in-out infinite" }}
      />
      <div
        className="absolute right-0 top-16 h-80 w-80 rounded-full bg-blue-950/40 blur-3xl"
        style={{ animation: "admin-blob 9s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-950/40 blur-3xl"
        style={{ animation: "admin-blob 10s ease-in-out infinite" }}
      />
      <Card className="relative z-10 w-full max-w-sm p-5">
        <form onSubmit={submit} className="space-y-4">
          <div className="text-center">
            <ShieldCheck className="mx-auto text-[#3b82f6]" size={40} />
            <h1 className="mt-2 font-mono text-2xl font-bold text-white">
              Admin Portal
            </h1>
            <p className="text-sm text-[#475569]">
              Urja System — Utility Dashboard
            </p>
            <p className="mt-1 text-xs text-red-400/70">
              Authorized personnel only
            </p>
          </div>
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-center text-xs text-red-400">
            <TriangleAlert
              className="mr-1 inline-block align-[-2px]"
              size={12}
            />{" "}
            This portal is for electricity utility staff only
          </div>
          <div>
            <label className="mb-1 block text-xs text-[#94a3b8]">
              Admin Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter admin phone number"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[#94a3b8]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-sm text-[#94a3b8]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="rounded-lg border border-[#2563eb]/20 bg-[#1a1a2e] p-3 text-xs text-[#60a5fa]">
            <div>
              <ShieldAlert
                className="mr-1 inline-block align-[-2px]"
                size={12}
              />{" "}
              Demo credentials:
            </div>
            <div>Phone: admin | Password: admin123</div>
          </div>
          <Button
            type="submit"
            className="w-full justify-center"
            size="lg"
            disabled={loading}
          >
            <ShieldCheck size={16} /> Admin Login
          </Button>
          {error ? (
            <p className="text-center text-sm text-red-400">{error}</p>
          ) : null}
          <button
            type="button"
            onClick={() => router.push("/auth")}
            className="block w-full cursor-pointer text-left text-xs text-[#475569] hover:text-white"
          >
            <span className="inline-flex items-center gap-1">
              <ArrowLeft size={12} /> Back to citizen portal
            </span>
          </button>
        </form>
      </Card>
    </div>
  );
}
