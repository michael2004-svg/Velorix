"use client";

import { motion } from "framer-motion";
import { UserPlus, FileCheck, Briefcase, DollarSign } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up with your email and upload your relevant certification or credentials.",
    color: "violet",
  },
  {
    number: "02",
    icon: FileCheck,
    title: "Get Verified",
    description:
      "Our team reviews your credentials. Most applications are processed within 48 hours.",
    color: "indigo",
  },
  {
    number: "03",
    icon: Briefcase,
    title: "Start Working",
    description:
      "Access your personalized dashboard and start contributing to AI projects immediately.",
    color: "cyan",
  },
  {
    number: "04",
    icon: DollarSign,
    title: "Get Paid",
    description:
      "Receive fair compensation directly to your account. Weekly payouts via PayPal.",
    color: "green",
  },
];

const colorMap: Record<string, string> = {
  violet: "from-violet-600 to-violet-500",
  indigo: "from-indigo-600 to-indigo-500",
  cyan: "from-cyan-600 to-cyan-500",
  green: "from-emerald-600 to-emerald-500",
};

const textColorMap: Record<string, string> = {
  violet: "text-violet-400",
  indigo: "text-indigo-400",
  cyan: "text-cyan-400",
  green: "text-emerald-400",
};

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Section gradient */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(124,58,237,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/8 text-violet-400 text-xs font-medium mb-4"
          >
            Simple Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl font-bold text-white mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-base max-w-xl mx-auto"
          >
            Join thousands of contributors already working on the world's most impactful AI projects.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 relative group"
            >
              {/* Step number */}
              <div className={`text-5xl font-display font-black opacity-10 ${textColorMap[step.color]} mb-4 leading-none`}>
                {step.number}
              </div>

              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[step.color]} flex items-center justify-center mb-4 shadow-glow-sm group-hover:scale-110 transition-transform duration-300`}
              >
                <step.icon size={18} className="text-white" />
              </div>

              <h3 className="font-display font-semibold text-white text-base mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 text-gray-700 text-lg z-10">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}