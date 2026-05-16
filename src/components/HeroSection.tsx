"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Users, CheckCircle, Globe } from "lucide-react";

interface HeroProps {
  onBrowseJobs: () => void;
}

const floatingCards = [
  {
    id: 1,
    icon: "📊",
    label: "Active Projects",
    value: "128+",
    sub: "Across 15+ categories",
    position: "top-[12%] right-[8%]",
    delay: 0,
  },
  {
    id: 2,
    icon: "👥",
    label: "Contributors",
    value: "25K+",
    sub: "Global community",
    position: "top-[42%] right-[2%]",
    delay: 1.5,
  },
  {
    id: 3,
    icon: "⚡",
    label: "Tasks Completed",
    value: "2.4M+",
    sub: "And counting",
    position: "bottom-[20%] right-[14%]",
    delay: 0.8,
  },
];

const trustBadges = [
  { icon: Users, label: "Trusted by 25K+ contributors" },
  { icon: CheckCircle, label: "Secure payments" },
  { icon: Globe, label: "Work from anywhere" },
];

export default function HeroSection({ onBrowseJobs }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Hero gradient */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(124,58,237,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-medium mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Train AI. Shape Tomorrow.
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
            >
              AI Training Jobs
              <br />
              <span className="gradient-text-violet">That Make an Impact</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg"
            >
              Join thousands of contributors working on real-world AI projects.
              Flexible work. Meaningful impact. Global community.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button
                onClick={onBrowseJobs}
                className="btn-primary flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold text-sm group"
              >
                Browse Jobs
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200 text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <Play size={10} className="text-white fill-white ml-0.5" />
                </div>
                How it Works
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-6"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-gray-500 text-xs"
                >
                  <badge.icon size={14} className="text-gray-600" />
                  {badge.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Globe visualization + floating cards */}
          <div className="relative hidden lg:block h-[580px]">
            {/* Animated globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <GlobeVisualization />
            </motion.div>

            {/* Floating stat cards */}
            {floatingCards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + card.delay * 0.3 }}
                className={`absolute ${card.position} glass-card rounded-2xl p-4 min-w-[160px]`}
                style={{
                  animation: `float ${6 + card.delay}s ease-in-out infinite`,
                  animationDelay: `${card.delay}s`,
                }}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs text-gray-500 font-medium">{card.label}</span>
                  <span className="text-lg">{card.icon}</span>
                </div>
                <div className="font-display text-2xl font-bold text-white">{card.value}</div>
                <div className="text-xs text-gray-600 mt-0.5">{card.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GlobeVisualization() {
  return (
    <div className="relative w-[500px] h-[500px]">
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full opacity-30 animate-pulse-glow"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(99,102,241,0.1) 50%, transparent 70%)" }}
      />

      {/* Main globe SVG */}
      <svg viewBox="0 0 500 500" className="w-full h-full" style={{ filter: "drop-shadow(0 0 40px rgba(124,58,237,0.4))" }}>
        <defs>
          <radialGradient id="globeGrad" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#1a1040" />
            <stop offset="40%" stopColor="#0d0820" />
            <stop offset="100%" stopColor="#050508" />
          </radialGradient>
          <radialGradient id="glowGrad" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(124,58,237,0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Globe base */}
        <circle cx="250" cy="250" r="220" fill="url(#globeGrad)" />
        <circle cx="250" cy="250" r="220" fill="none" stroke="rgba(124,58,237,0.25)" strokeWidth="1" />

        {/* Latitude lines */}
        {[-60, -30, 0, 30, 60].map((lat, i) => {
          const y = 250 + (lat / 90) * 200;
          const radiusFactor = Math.cos((lat * Math.PI) / 180);
          const rx = 220 * radiusFactor;
          return (
            <ellipse
              key={i}
              cx="250"
              cy={y}
              rx={rx}
              ry={rx * 0.15}
              fill="none"
              stroke="rgba(124,58,237,0.12)"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Longitude lines */}
        {[0, 30, 60, 90, 120, 150].map((lng, i) => (
          <ellipse
            key={i}
            cx="250"
            cy="250"
            rx={Math.abs(Math.cos((lng * Math.PI) / 180)) * 30 + 190}
            ry="220"
            fill="none"
            stroke="rgba(124,58,237,0.08)"
            strokeWidth="0.8"
            transform={`rotate(${lng}, 250, 250)`}
          />
        ))}

        {/* Glowing dots (contributors) */}
        {[
          [180, 160], [300, 140], [350, 200], [150, 250],
          [280, 280], [200, 320], [320, 300], [250, 200],
          [170, 190], [330, 160], [260, 350], [220, 180],
          [290, 240], [160, 300], [380, 250],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="2" fill="rgba(124,58,237,0.9)" />
            <circle cx={x} cy={y} r="5" fill="rgba(124,58,237,0.2)" />
          </g>
        ))}

        {/* Connection lines */}
        {[
          [180, 160, 300, 140],
          [300, 140, 350, 200],
          [350, 200, 280, 280],
          [280, 280, 200, 320],
          [180, 160, 150, 250],
          [150, 250, 200, 320],
          [250, 200, 290, 240],
          [290, 240, 320, 300],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(124,58,237,0.25)"
            strokeWidth="0.8"
          />
        ))}

        {/* Bright highlight */}
        <circle
          cx="180"
          cy="160"
          r="8"
          fill="rgba(139,92,246,0.8)"
          style={{ filter: "blur(2px)" }}
        />
      </svg>

      {/* Orbit ring */}
      <div
        className="absolute inset-[-20px] rounded-full border border-violet-500/10 animate-spin-slow"
        style={{ borderStyle: "dashed" }}
      />
    </div>
  );
}