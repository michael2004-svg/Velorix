"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, DollarSign, X, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplyModal from "@/components/ApplyModal";
import { JOBS, CATEGORIES } from "@/lib/jobs-data";
import { CATEGORY_COLORS } from "@/lib/utils";
import { Job } from "@/lib/types";
import { ArrowRight, MapPin, Clock } from "lucide-react";

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [payFilter, setPayFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

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
      const matchLevel =
        levelFilter === "all" || job.level.toLowerCase() === levelFilter;
      return matchCategory && matchSearch && matchPay && matchLevel;
    });
  }, [activeCategory, searchQuery, payFilter, levelFilter]);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-darker">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="orb w-[500px] h-[500px] top-[-150px] left-[-100px] opacity-15"
          style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }}
        />
        <div
          className="orb w-[300px] h-[300px] top-[50%] right-[-80px] opacity-10"
          style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Page Hero */}
        <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 grid-bg opacity-25" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.25) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-medium mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              {JOBS.length} Open Positions
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl font-bold text-white mb-4 leading-tight"
            >
              Find Your AI Training Job
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg max-w-xl mx-auto"
            >
              High-quality projects across every domain. Fair pay. Real impact on
              AI systems used by millions.
            </motion.p>
          </div>
        </section>

        {/* Filters bar */}
        <section className="sticky top-16 z-30 bg-[#050508]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-3 items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="text"
                  placeholder="Search jobs, skills, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#0F0F1A] border border-white/8 rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Pay filter */}
              <div className="relative hidden sm:block">
                <DollarSign size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <select
                  value={payFilter}
                  onChange={(e) => setPayFilter(e.target.value)}
                  className="pl-8 pr-8 py-2 bg-[#0F0F1A] border border-white/8 rounded-xl text-sm text-gray-400 focus:outline-none focus:border-violet-500/40 appearance-none cursor-pointer"
                >
                  <option value="all">Any Pay</option>
                  <option value="under30">Under $30/hr</option>
                  <option value="30to50">$30–$50/hr</option>
                  <option value="over50">$50+/hr</option>
                </select>
              </div>

              {/* Level filter */}
              <div className="hidden sm:block">
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="px-3 py-2 bg-[#0F0F1A] border border-white/8 rounded-xl text-sm text-gray-400 focus:outline-none focus:border-violet-500/40 appearance-none cursor-pointer"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="senior">Senior</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              {/* Mobile filters toggle */}
              <button
                className="sm:hidden flex items-center gap-2 px-3 py-2 glass-card rounded-xl text-gray-400 text-sm"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>

              <div className="ml-auto text-gray-600 text-sm shrink-0">
                {filteredJobs.length} results
              </div>
            </div>

            {/* Mobile filters dropdown */}
            <AnimatePresence>
              {filtersOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 grid grid-cols-2 gap-2 sm:hidden"
                >
                  <select
                    value={payFilter}
                    onChange={(e) => setPayFilter(e.target.value)}
                    className="px-3 py-2 bg-[#0F0F1A] border border-white/8 rounded-xl text-sm text-gray-400 focus:outline-none"
                  >
                    <option value="all">Any Pay</option>
                    <option value="under30">Under $30/hr</option>
                    <option value="30to50">$30–$50/hr</option>
                    <option value="over50">$50+/hr</option>
                  </select>
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="px-3 py-2 bg-[#0F0F1A] border border-white/8 rounded-xl text-sm text-gray-400 focus:outline-none"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Main content */}
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex gap-8">
            {/* Left sidebar - categories */}
            <aside className="hidden lg:block w-52 shrink-0">
              <div className="sticky top-36">
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wider mb-3 px-2">
                  Categories
                </p>
                <div className="space-y-0.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        activeCategory === cat
                          ? "bg-violet-500/15 text-violet-400 font-medium"
                          : "text-gray-500 hover:text-gray-300 hover:bg-white/4"
                      }`}
                    >
                      {cat}
                      <span className="ml-1 text-xs text-gray-700">
                        ({cat === "All Jobs"
                          ? JOBS.length
                          : JOBS.filter((j) => j.category === cat).length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Job listings */}
            <div className="flex-1 min-w-0">
              {/* Mobile category pills */}
              <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
                {CATEGORIES.slice(0, 7).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? "bg-violet-600 text-white"
                        : "bg-white/5 text-gray-400 border border-white/8"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {filteredJobs.map((job, i) => (
                    <FullJobCard key={job.id} job={job} index={i} onApply={handleApply} />
                  ))}
                </AnimatePresence>

                {filteredJobs.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card rounded-2xl p-16 text-center"
                  >
                    <Filter size={36} className="mx-auto mb-4 text-gray-700" />
                    <h3 className="font-display font-semibold text-white text-lg mb-2">
                      No jobs found
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      Try adjusting your filters or search query.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("All Jobs");
                        setPayFilter("all");
                        setLevelFilter("all");
                      }}
                      className="text-violet-400 text-sm hover:text-violet-300 transition-colors"
                    >
                      Clear all filters
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {modalOpen && selectedJob && (
        <ApplyModal
          job={selectedJob}
          onClose={() => {
            setModalOpen(false);
            setSelectedJob(null);
          }}
        />
      )}
    </main>
  );
}

function FullJobCard({
  job,
  index,
  onApply,
}: {
  job: Job;
  index: number;
  onApply: (job: Job) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const colors = CATEGORY_COLORS[job.categoryColor] || CATEGORY_COLORS.violet;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="glass-card rounded-2xl overflow-hidden group"
    >
      {/* Main row */}
      <div
        className="p-5 flex items-start gap-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 text-xl`}
        >
          {getCategoryEmoji(job.category)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
              {job.category}
            </span>
            <span className="text-xs text-gray-600">{job.level}</span>
            <span className="text-xs text-gray-600">·</span>
            <span className="text-xs text-gray-600">{job.contractType}</span>
          </div>
          <h3 className="font-display font-semibold text-white text-base mb-1 group-hover:text-violet-300 transition-colors">
            {job.title}
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-2">
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
          </div>
        </div>

        {/* Pay + Apply */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className="text-right">
            <div className="font-display font-bold text-white text-lg">{job.payRange}</div>
            <div className="text-gray-600 text-xs">Est. rate</div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApply(job);
            }}
            className="btn-primary px-5 py-2 rounded-lg text-white text-xs font-semibold flex items-center gap-1.5"
          >
            Apply Now
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-white/5">
              <div className="grid sm:grid-cols-3 gap-4 mt-4">
                {/* Skills */}
                <div>
                  <p className="text-gray-600 text-xs font-medium mb-2 uppercase tracking-wider">
                    Required Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs text-gray-400 bg-white/5 border border-white/8 px-2 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <p className="text-gray-600 text-xs font-medium mb-2 uppercase tracking-wider">
                    Topics
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certification */}
                <div>
                  <p className="text-gray-600 text-xs font-medium mb-2 uppercase tracking-wider">
                    Required Certification
                  </p>
                  <div className="glass-card rounded-lg p-2.5">
                    <p className="text-white text-xs font-medium mb-1">
                      {job.courseName}
                    </p>
                    <a
                      href="/academy"
                      className="text-violet-400 text-xs hover:text-violet-300 transition-colors"
                    >
                      Get certified →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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