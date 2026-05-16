"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase, Clock, CheckCircle, Award, DollarSign,
  ArrowRight, GraduationCap, Bell, Settings, LogOut, Zap,
  BookOpen, BarChart2
} from "lucide-react";
import Link from "next/link";
import { JOBS } from "@/lib/jobs-data";

type DashboardTab = "jobs" | "applications" | "courses" | "earnings";

const statusTimeline = [
  { label: "Submitted", done: true },
  { label: "Under Review", done: true },
  { label: "Approved", done: false },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("jobs");

  const navItems: { tab: DashboardTab; icon: any; label: string }[] = [
    { tab: "jobs", icon: Briefcase, label: "Available Jobs" },
    { tab: "applications", icon: Clock, label: "My Applications" },
    { tab: "courses", icon: GraduationCap, label: "My Courses" },
    { tab: "earnings", icon: DollarSign, label: "Earnings" },
  ];

  return (
    <div className="min-h-screen bg-darker flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-white/5 flex flex-col">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Zap size={14} className="text-white fill-white" />
            </div>
            <span className="font-display font-bold text-white text-sm">
              Velorix <span className="text-violet-400">AI</span>
            </span>
          </div>
        </div>

        {/* User card */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 text-sm font-bold">
              SC
            </div>
            <div>
              <div className="text-white text-xs font-medium">Sarah Chen</div>
              <div className="text-gray-600 text-xs flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Pending Review
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-all ${
                activeTab === item.tab
                  ? "bg-violet-500/15 text-violet-400 font-medium"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/4"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5 space-y-0.5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-300 hover:bg-white/4 transition-colors">
            <Bell size={16} />
            Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-300 hover:bg-white/4 transition-colors">
            <Settings size={16} />
            Settings
          </button>
          <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/8 transition-colors">
            <LogOut size={16} />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6">
          <h1 className="font-display font-semibold text-white capitalize">
            {activeTab === "jobs" ? "Available Jobs" :
             activeTab === "applications" ? "My Applications" :
             activeTab === "courses" ? "My Courses" : "Earnings"}
          </h1>
        </div>

        <div className="p-6">
          {/* Applications tab */}
          {activeTab === "applications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-display font-semibold text-white text-base mb-1">
                      Mathematics AI Trainer
                    </h3>
                    <p className="text-gray-500 text-sm">Applied Jan 15, 2025</p>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500/15 text-amber-400">
                    Pending Review
                  </span>
                </div>

                {/* Status timeline */}
                <div className="flex items-center gap-3">
                  {statusTimeline.map((s, i) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          s.done ? "bg-violet-500/20 border border-violet-500/40" : "bg-white/5 border border-white/10"
                        }`}>
                          {s.done ? (
                            <CheckCircle size={14} className="text-violet-400" />
                          ) : (
                            <Clock size={14} className="text-gray-600" />
                          )}
                        </div>
                        <span className={`text-xs ${s.done ? "text-violet-400" : "text-gray-600"}`}>
                          {s.label}
                        </span>
                      </div>
                      {i < statusTimeline.length - 1 && (
                        <div className={`w-12 h-px mb-5 ${s.done ? "bg-violet-500/40" : "bg-white/8"}`} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-3 rounded-lg bg-amber-500/8 border border-amber-500/15 text-amber-400 text-xs">
                  ⏱ Your certificate is being reviewed. You'll be notified within 48 hours.
                </div>
              </div>
            </motion.div>
          )}

          {/* Jobs tab */}
          {activeTab === "jobs" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-500/8 border border-amber-500/15 text-amber-400 text-xs mb-4 flex items-center gap-2">
                <Clock size={14} />
                Your account is pending verification. Jobs will be unlocked once approved.
              </div>
              {JOBS.slice(0, 4).map((job) => (
                <div key={job.id} className="glass-card rounded-xl p-4 opacity-60">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-semibold text-white text-sm mb-1">{job.title}</h3>
                      <p className="text-gray-500 text-xs">{job.category} · {job.payRange}</p>
                    </div>
                    <button className="text-xs text-gray-600 border border-white/8 px-3 py-1.5 rounded-lg cursor-not-allowed">
                      Locked
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Courses tab */}
          {activeTab === "courses" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <BookOpen size={20} className="text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm">
                      Advanced AI Math Evaluation Program
                    </h3>
                    <p className="text-gray-500 text-xs">8 weeks · 12 modules</p>
                  </div>
                </div>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-gray-500">Progress</span>
                  <span className="text-violet-400">45%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[45%] bg-gradient-to-r from-violet-600 to-violet-400 rounded-full" />
                </div>
                <button className="mt-4 btn-primary w-full py-2.5 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-2">
                  Continue Learning <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Earnings tab */}
          {activeTab === "earnings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total Earned", value: "$0.00", icon: DollarSign },
                  { label: "This Month", value: "$0.00", icon: BarChart2 },
                  { label: "Pending", value: "$0.00", icon: Clock },
                ].map((s) => (
                  <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                    <s.icon size={20} className="mx-auto mb-2 text-gray-600" />
                    <div className="font-display font-bold text-white text-xl">{s.value}</div>
                    <div className="text-gray-600 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="glass-card rounded-2xl p-8 text-center text-gray-600">
                <Award size={32} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">Your earnings will appear here once you start working on approved tasks.</p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}