"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Briefcase, GraduationCap, DollarSign,
  Clock, BarChart2, Activity, Search,
  Filter, Settings, Bell, LogOut, Zap,
  TrendingUp, CheckCircle
} from "lucide-react";
import StatsGrid from "@/components/admin/StatsGrid";
import ApplicationsTable from "@/components/admin/ApplicationsTable";
import ActivityFeed from "@/components/admin/ActivityFeed";

const mockApplications = [
  { id: "1", name: "Sarah Chen", email: "sarah@example.com", job: "Mathematics AI Trainer", status: "pending_verification", date: "2025-01-15", cert: "math_cert.pdf" },
  { id: "2", name: "James Okafor", email: "james@example.com", job: "Coding Expert AI Trainer", status: "under_verification", date: "2025-01-14", cert: "coding_cert.pdf" },
  { id: "3", name: "Priya Sharma", email: "priya@example.com", job: "Medical AI Data Annotator", status: "approved", date: "2025-01-13", cert: "medical_cert.pdf" },
  { id: "4", name: "Carlos Mendez", email: "carlos@example.com", job: "Cybersecurity AI Trainer", status: "rejected", date: "2025-01-12", cert: "security_cert.pdf" },
  { id: "5", name: "Yuki Tanaka", email: "yuki@example.com", job: "Legal AI Content Reviewer", status: "pending_verification", date: "2025-01-11", cert: "legal_cert.pdf" },
];

const dashboardStats = [
  { icon: Users, label: "Total Contributors", value: "25,847", change: "+12%", color: "violet" as const },
  { icon: Briefcase, label: "Active Jobs", value: "12", change: "+2", color: "cyan" as const },
  { icon: Clock, label: "Pending Review", value: "143", change: "-8", color: "amber" as const },
  { icon: DollarSign, label: "Monthly Revenue", value: "$128K", change: "+24%", color: "emerald" as const },
];

type AdminTab = "overview" | "applications" | "jobs" | "courses" | "payments" | "users";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [applications, setApplications] = useState(mockApplications);

  const handleStatusChange = (id: string, newStatus: string, notes?: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: newStatus, adminNotes: notes } : app
      )
    );
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems: { tab: AdminTab; icon: any; label: string }[] = [
    { tab: "overview", icon: BarChart2, label: "Overview" },
    { tab: "applications", icon: CheckCircle, label: "Applications" },
    { tab: "jobs", icon: Briefcase, label: "Jobs" },
    { tab: "courses", icon: GraduationCap, label: "Courses" },
    { tab: "payments", icon: DollarSign, label: "Payments" },
    { tab: "users", icon: Users, label: "Users" },
  ];

  return (
    <div className="min-h-screen bg-darker flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-white/5 flex flex-col">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Zap size={14} className="text-white fill-white" />
            </div>
            <span className="font-display font-bold text-white text-sm">
              Velorix <span className="text-violet-400">Admin</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeTab === item.tab
                  ? "bg-violet-500/15 text-violet-400 font-medium"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/4"
              }`}
            >
              <item.icon size={15} />
              {item.label}
              {item.tab === "applications" && (
                <span className="ml-auto bg-amber-500/20 text-amber-400 text-xs px-1.5 py-0.5 rounded-full">
                  {applications.filter(a => a.status === "pending_verification").length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5 space-y-0.5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-300 hover:bg-white/4 transition-colors">
            <Settings size={15} />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/8 transition-colors">
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 sticky top-0 bg-[#050508]/80 backdrop-blur-xl z-10">
          <h1 className="font-display font-semibold text-white text-sm capitalize">
            {activeTab === "overview" ? "Dashboard" : activeTab}
          </h1>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
            </button>
            <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 text-xs font-bold">
              A
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <StatsGrid stats={dashboardStats} />

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Applications table */}
                <div className="lg:col-span-2 glass-card rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-white text-sm">
                      Recent Applications
                    </h3>
                    <button
                      onClick={() => setActiveTab("applications")}
                      className="text-violet-400 text-xs hover:text-violet-300 transition-colors"
                    >
                      View all →
                    </button>
                  </div>
                  <ApplicationsTable
                    applications={applications.slice(0, 3)}
                    onStatusChange={handleStatusChange}
                  />
                </div>

                {/* Activity feed */}
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity size={15} className="text-violet-400" />
                    <h3 className="font-display font-semibold text-white text-sm">
                      Activity
                    </h3>
                  </div>
                  <ActivityFeed />
                </div>
              </div>

              {/* Quick stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Approval Rate", value: "78%", icon: TrendingUp, color: "emerald" },
                  { label: "Avg Review Time", value: "36hrs", icon: Clock, color: "cyan" },
                  { label: "Active Trainers", value: "1,847", icon: Users, color: "violet" },
                ].map((s) => (
                  <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                    <div className={`text-2xl font-display font-bold text-white mb-0.5`}>{s.value}</div>
                    <div className="text-gray-600 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "applications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 bg-[#0F0F1A] border border-white/8 rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500/40"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-gray-400 text-sm hover:text-white transition-colors">
                  <Filter size={13} />
                  Filter
                </button>
                <div className="ml-auto text-gray-600 text-sm flex items-center">
                  {filteredApplications.length} results
                </div>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <ApplicationsTable
                  applications={filteredApplications}
                  onStatusChange={handleStatusChange}
                />
              </div>
            </motion.div>
          )}

          {(["jobs", "courses", "payments", "users"] as AdminTab[]).includes(activeTab) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-2xl p-12 text-center"
            >
              <Activity size={32} className="mx-auto mb-3 text-gray-700" />
              <h3 className="font-display font-semibold text-white text-lg mb-2 capitalize">
                {activeTab} Management
              </h3>
              <p className="text-gray-500 text-sm">
                Connect your Supabase backend to populate this section with live data.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}