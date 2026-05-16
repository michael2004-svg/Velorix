"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-darker flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(124,58,237,0.2) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center"
      >
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Zap size={18} className="text-white fill-white" />
          </div>
          <span className="font-display font-bold text-white text-xl">
            Velorix <span className="gradient-text-violet">AI</span>
          </span>
        </div>

        <div className="font-display text-8xl font-black text-white/10 mb-4 leading-none">
          404
        </div>
        <h1 className="font-display text-3xl font-bold text-white mb-3">
          Page not found
        </h1>
        <p className="text-gray-500 text-base mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-primary flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white font-semibold text-sm"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <Link
            href="/jobs"
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
          >
            Browse Jobs
          </Link>
        </div>
      </motion.div>
    </div>
  );
}