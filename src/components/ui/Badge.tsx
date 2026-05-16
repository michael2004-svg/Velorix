import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "violet" | "cyan" | "green" | "amber" | "red" | "pink" | "blue" | "default";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

const variantStyles = {
  violet: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  cyan: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  amber: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  red: "bg-red-500/15 text-red-400 border-red-500/20",
  pink: "bg-pink-500/15 text-pink-400 border-pink-500/20",
  blue: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  default: "bg-white/8 text-gray-400 border-white/10",
};

const dotColors = {
  violet: "bg-violet-400",
  cyan: "bg-cyan-400",
  green: "bg-emerald-400",
  amber: "bg-amber-400",
  red: "bg-red-400",
  pink: "bg-pink-400",
  blue: "bg-blue-400",
  default: "bg-gray-500",
};

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium border rounded-full",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
}