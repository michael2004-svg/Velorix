"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Stat {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  color: "violet" | "cyan" | "amber" | "emerald" | "pink" | "blue";
}

interface StatsGridProps {
  stats: Stat[];
}

const colorMap = {
  violet: { bg: "bg-violet-500/20", text: "text-violet-400" },
  cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400" },
  amber: { bg: "bg-amber-500/20", text: "text-amber-400" },
  emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  pink: { bg: "bg-pink-500/20", text: "text-pink-400" },
  blue: { bg: "bg-blue-500/20", text: "text-blue-400" },
};

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const colors = colorMap[stat.color];
        const isPositive = stat.change.startsWith("+");

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass-card rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colors.bg}`}>
                <stat.icon size={16} className={colors.text} />
              </div>
              <span
                className={`text-xs font-medium px-1.5 py-0.5 rounded-md ${
                  isPositive
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-red-400 bg-red-500/10"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="font-display font-bold text-white text-2xl mb-0.5">
              {stat.value}
            </div>
            <div className="text-gray-600 text-xs">{stat.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}