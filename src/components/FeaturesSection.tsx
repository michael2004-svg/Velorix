"use client";

import { motion } from "framer-motion";
import { Target, Globe, Shield, Star, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Impactful Work",
    description: "Help build AI systems that improve lives and solve real-world problems.",
    color: "violet",
  },
  {
    icon: Globe,
    title: "Flexible & Remote",
    description: "Work on your schedule from anywhere in the world.",
    color: "cyan",
  },
  {
    icon: Shield,
    title: "Fair & Transparent",
    description: "Clear guidelines, fair pay, and transparent processes.",
    color: "green",
  },
];

const whyVelorix = [
  { icon: Star, title: "Meaningful Impact", description: "Contribute to AI systems used by millions." },
  { icon: Users, title: "Global Community", description: "Join a network of passionate contributors." },
  { icon: TrendingUp, title: "Grow Your Skills", description: "Learn, improve, and advance in AI." },
];

export default function FeaturesSection() {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main features */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="grid sm:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        feature.color === "violet"
                          ? "bg-violet-500/20"
                          : feature.color === "cyan"
                          ? "bg-cyan-500/20"
                          : "bg-emerald-500/20"
                      }`}
                    >
                      <feature.icon
                        size={18}
                        className={
                          feature.color === "violet"
                            ? "text-violet-400"
                            : feature.color === "cyan"
                            ? "text-cyan-400"
                            : "text-emerald-400"
                        }
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white text-sm mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Why Velorix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="font-display font-semibold text-white text-sm mb-5">
              Why Work with Velorix AI?
            </h3>
            <div className="space-y-4">
              {whyVelorix.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <item.icon size={16} className="text-violet-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white text-xs font-medium">{item.title}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/5">
              <p className="text-white text-xs font-medium mb-1">New to AI Training?</p>
              <p className="text-gray-500 text-xs mb-3">
                Learn how it works and start your journey today.
              </p>
              <button className="flex items-center gap-2 text-xs text-white border border-white/10 rounded-lg px-4 py-2 hover:bg-white/5 transition-colors w-full justify-between">
                <span>Learn More</span>
                <span>→</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}