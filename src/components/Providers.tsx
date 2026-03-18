"use client";

import dynamic from "next/dynamic";
import { TooltipProvider } from "@/components/ui/tooltip";

// Lazy-load toasters — they are never in the critical render path
const Toaster = dynamic(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster }))
);
const Sonner = dynamic(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster }))
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      {children}
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
}
