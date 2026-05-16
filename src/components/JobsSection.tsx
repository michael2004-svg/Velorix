"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowRight, Clock, MapPin, DollarSign } from "lucide-react";
import { JOBS, CATEGORIES } from "@/lib/jobs-data";
import { CATEGORY_COLORS } from "@/lib/utils";
import { Job } from "@/lib/types";

interface JobsSectionProps {
  onApply: (job: Job) => void;
}

export default function JobsSection({ onApply }: JobsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All Jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [payFilter, setPayFilter] = useState("all");

  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      const matchCategory =
        activeCategory === "All Jobs" || job.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchPay =
        payFilter === "all" ||
        (payFilter === "under30" && job.payMin < 30) ||
        (payFilter === "30to50" && job.payMin >= 30 && job.payMax <= 50) ||
        (payFilter === "over50" && job.payMax > 50);
      return matchCategory && matchSearch && matchPay;
    });
  }, [activeCategory, searchQuery, payFilter]);

  return (
    <section id="jobs" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl font-bold text-white mb-1"
            >
              Featured AI Training Jobs
            </motion.h2>
            <p className="text-gray-500 text-sm">
              High-quality projects. Fair pay. Real impact.
            </p>
          </div>
          <button className="hidden sm:flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors">
            View all jobs <ArrowRight size={14} />
          </button>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Search jobs, skills, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#0F0F1A] border border-white/8 rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all"
            />
          </div>
          <div className="relative">
            <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <select
              value={payFilter}
              onChange={(e) => setPayFilter(e.target.value)}
              className="pl-8 pr-8 py-2.5 bg-[#0F0F1A] border border-white/8 rounded-xl text-sm text-gray-400 focus:outline-none focus:border-violet-500/40 appearance-none cursor-pointer"
            >
              <option value="all">Any Pay</option>
              <option value="under30">Under $30/hr</option>
              <option value="30to50">$30–$50/hr</option>
              <option value="over50">$50+/hr</option>
            </select>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-violet-600 text-white shadow-glow-sm"
                  : "bg-white/5 text-gray-400 hover:bg-white/8 hover:text-gray-300 border border-white/8"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Jobs list */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} onApply={onApply} />
            ))}
          </AnimatePresence>

          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-gray-600"
            >
              <Filter size={32} className="mx-auto mb-3 opacity-50" />
              <p className="text-sm">No jobs match your filters. Try adjusting your search.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function JobCard({ job, index, onApply }: { job: Job; index: number; onApply: (job: Job) => void }) {
  const colors = CATEGORY_COLORS[job.categoryColor] || CATEGORY_COLORS.violet;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ scale: 1.005 }}
      className="glass-card rounded-2xl p-5 flex items-center gap-5 cursor-pointer group transition-all duration-300"
    >
      {/* Job icon/thumbnail */}
      <div
        className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 text-2xl`}
        style={{ border: `1px solid ${colors.glow}20` }}
      >
        {getCategoryEmoji(job.category)}
      </div>

      {/* Job info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
          >
            {job.category}
          </span>
          <span className="text-xs text-gray-600">{job.contractType}</span>
        </div>
        <h3 className="font-display font-semibold text-white text-base mb-1 group-hover:text-violet-300 transition-colors truncate">
          {job.title}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-1 mb-2">
          {job.description}
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1 text-gray-600 text-xs">
            <MapPin size={11} />
            {job.location}
          </div>
          <div className="flex items-center gap-1 text-gray-600 text-xs">
            <Clock size={11} />
            {job.duration}
          </div>
          {job.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-gray-600 bg-white/4 border border-white/6 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Pay + Apply */}
      <div className="flex flex-col items-end gap-3 shrink-0">
        <div className="text-right">
          <div className="font-display font-bold text-white text-lg">{job.payRange}</div>
          <div className="text-gray-600 text-xs">Est. rate</div>
        </div>
        <button
          onClick={() => onApply(job)}
          className="btn-primary px-5 py-2 rounded-lg text-white text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap"
        >
          Apply Now
          <ArrowRight size={12} />
        </button>
      </div>
    </motion.div>
  );
}

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    Mathematics: "∑",
    "Software Engineering": "⌨️",
    Cybersecurity: "🔐",
    Healthcare: "🏥",
    Legal: "⚖️",
    Research: "🔬",
    Creative: "✍️",
    Finance: "📈",
    Language: "🌍",
    "Computer Vision": "👁️",
    "Quality Assurance": "✅",
    Audio: "🎙️",
  };
  return map[category] || "🤖";
}