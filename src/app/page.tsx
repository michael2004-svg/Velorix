"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import JobsSection from "@/components/JobsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ApplyModal from "@/components/ApplyModal";
import { Job } from "@/lib/types";

export default function Home() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-darker overflow-hidden">
      {/* Global ambient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="orb w-[600px] h-[600px] top-[-200px] left-[-100px] opacity-20"
          style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }}
        />
        <div
          className="orb w-[400px] h-[400px] top-[40%] right-[-150px] opacity-15"
          style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }}
        />
        <div
          className="orb w-[500px] h-[500px] bottom-[-100px] left-[30%] opacity-10"
          style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection onBrowseJobs={() => document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" })} />
        <FeaturesSection />
        <JobsSection onApply={handleApply} />
        <HowItWorksSection />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
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