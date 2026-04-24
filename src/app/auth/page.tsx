"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BadgeInfo, MapPin, Zap } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const pulseStyle = {
  animation: "pulse-slow 4s ease-in-out infinite",
};

export default function AuthPage() {
  const router = useRouter();
  const { loginWithPhone } = useAuth();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (): void => {
    if (!phone.trim()) return;
    setOtpSent(true);
  };

  const handleVerify = (): void => {
    if (!otp.trim()) return;
    setLoading(true);
    loginWithPhone(phone.trim());
    router.push("/map");
  };

  const handleGuest = (): void => {
    loginWithPhone("9999999999");
    router.push("/map");
  };

  const inputClass =
    "w-full bg-[#ffffff] border border-[#e2e8f0] rounded-lg px-4 py-3 text-[#0f172a] font-mono placeholder-[#94a3b8] text-sm focus:outline-none focus:border-[#2563eb] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.2)] transition-all duration-200";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8fafc] px-4">
      <style jsx global>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.06;
          }
          50% {
            opacity: 0.12;
          }
        }
      `}</style>
      <div
        className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-blue-600 blur-3xl"
        style={pulseStyle}
      />
      <div
        className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-blue-800 blur-3xl"
        style={pulseStyle}
      />
      <div
        className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900 blur-3xl"
        style={pulseStyle}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 text-center">
          <Zap className="mx-auto text-[#3b82f6]" size={40} />
          <h1 className="mt-2 font-mono text-2xl font-bold text-[#0f172a]">
            Urja System
          </h1>
          <p className="text-sm text-[#475569]">Pune Power Outage Tracker</p>
          <div className="mt-6 mb-6 h-px bg-linear-to-r from-transparent via-[#2563eb]/40 to-transparent" />
        </div>

        <Card>
          <h2 className="text-xl font-semibold text-[#0f172a]">Sign In</h2>
          <p className="mb-6 text-sm text-[#334155]">
            Enter your phone number to continue
          </p>

          <div className="mb-4">
            <label className="mb-1 block text-xs text-[#334155]">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className={inputClass}
            />
          </div>

          <div className="mb-4 rounded-lg border border-[#2563eb]/20 bg-[#e2e8f0] p-3">
            <p className="text-xs text-[#1d4ed8]">
              <BadgeInfo className="mr-1 inline-block align-[-2px]" size={12} />{" "}
              Mock OTP: Enter any 6-digit number
            </p>
            <p className="mt-1 text-xs text-[#475569]">
              <MapPin className="mr-1 inline-block align-[-2px]" size={12} />{" "}
              Use phone &apos;0000000000&apos; for admin access
            </p>
          </div>

          {otpSent && (
            <div className="mb-4">
              <label className="mb-1 block text-xs text-[#334155]">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className={inputClass}
              />
            </div>
          )}

          {!otpSent ? (
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={handleSendOtp}
            >
              Send OTP
            </Button>
          ) : (
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={handleVerify}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </Button>
          )}

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e2e8f0]" />
            <span className="text-xs text-[#475569]">or</span>
            <div className="h-px flex-1 bg-[#e2e8f0]" />
          </div>

          <Button
            variant="ghost"
            className="w-full justify-center"
            onClick={handleGuest}
          >
            Continue as Guest (Demo)
          </Button>

          <p className="mt-4 text-center text-xs text-[#475569]">
            Admin? Use phone number:{" "}
            <span className="font-mono text-[#1d4ed8]">admin</span>
          </p>
        </Card>
      </div>
    </div>
  );
}
