"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl p-12 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(99,102,241,0.15) 50%, rgba(6,182,212,0.1) 100%)",
            border: "1px solid rgba(124,58,237,0.25)",
          }}
        >
          {/* Background effects */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 opacity-40"
            style={{
              background: "radial-gradient(ellipse, rgba(124,58,237,0.5) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-medium mb-6">
              🚀 Join 25,000+ Contributors
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Ready to Shape the
              <br />
              <span className="gradient-text">Future of AI?</span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
              Start earning from your expertise today. No office required.
              Work on AI systems that matter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#jobs"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold"
              >
                Browse Open Jobs
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/academy"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-white/15 text-gray-300 hover:text-white hover:bg-white/5 hover:border-white/25 transition-all font-medium"
              >
                <GraduationCap size={16} />
                Visit Velorix Academy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}