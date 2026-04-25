import { Zap } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({
  message = "LOADING...",
}: LoadingScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f8fafc]">
      <Zap className="animate-pulse-glow text-[#3b82f6]" size={48} />
      <div className="font-mono text-xl font-bold tracking-[0.3em] text-[#0f172a]">
        Light Buddy
      </div>
      <div className="h-0.5 w-48 overflow-hidden rounded-full bg-[#1e2a3a]">
        <div className="loading-slide h-full w-1/2 rounded-full bg-[#2563eb]" />
      </div>
      <p className="mt-2 font-mono text-sm text-[#334155]">{message}</p>
    </div>
  );
}
