"use client";

import { motion } from "framer-motion";
import { CheckCircle, UserPlus, DollarSign, XCircle, Clock } from "lucide-react";

interface Activity {
  id: string;
  type: "approval" | "signup" | "payment" | "rejection" | "review";
  message: string;
  time: string;
  user?: string;
}

const mockActivities: Activity[] = [
  { id: "1", type: "approval", message: "Application approved for Mathematics AI Trainer", time: "2 min ago", user: "Sarah Chen" },
  { id: "2", type: "signup", message: "New contributor registered", time: "12 min ago", user: "James Okafor" },
  { id: "3", type: "payment", message: "Course payment received — AI Coding Specialist", time: "28 min ago", user: "Priya Sharma" },
  { id: "4", type: "rejection", message: "Application rejected — invalid certificate", time: "1 hr ago", user: "Unknown" },
  { id: "5", type: "review", message: "Certificate marked for manual review", time: "2 hrs ago", user: "Carlos M." },
  { id: "6", type: "approval", message: "Application approved for Cybersecurity AI Trainer", time: "3 hrs ago", user: "Yuki Tanaka" },
];

const typeConfig = {
  approval: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/15" },
  signup: { icon: UserPlus, color: "text-violet-400", bg: "bg-violet-500/15" },
  payment: { icon: DollarSign, color: "text-cyan-400", bg: "bg-cyan-500/15" },
  rejection: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/15" },
  review: { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/15" },
};

export default function ActivityFeed({ activities = mockActivities }: { activities?: Activity[] }) {
  return (
    <div className="space-y-3">
      {activities.map((activity, i) => {
        const config = typeConfig[activity.type];
        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3"
          >
            <div className={`w-7 h-7 rounded-full ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
              <config.icon size={13} className={config.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-300 text-xs leading-relaxed">
                {activity.user && (
                  <span className="text-white font-medium">{activity.user} — </span>
                )}
                {activity.message}
              </p>
              <p className="text-gray-600 text-xs mt-0.5">{activity.time}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}