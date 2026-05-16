import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  violet: {
    bg: "bg-purple-500/15",
    text: "text-purple-400",
    border: "border-purple-500/20",
    glow: "rgba(139,92,246,0.3)",
  },
  cyan: {
    bg: "bg-cyan-500/15",
    text: "text-cyan-400",
    border: "border-cyan-500/20",
    glow: "rgba(6,182,212,0.3)",
  },
  green: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    glow: "rgba(16,185,129,0.3)",
  },
  pink: {
    bg: "bg-pink-500/15",
    text: "text-pink-400",
    border: "border-pink-500/20",
    glow: "rgba(236,72,153,0.3)",
  },
  orange: {
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    border: "border-amber-500/20",
    glow: "rgba(245,158,11,0.3)",
  },
  blue: {
    bg: "bg-blue-500/15",
    text: "text-blue-400",
    border: "border-blue-500/20",
    glow: "rgba(59,130,246,0.3)",
  },
};