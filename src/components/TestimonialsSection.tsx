"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Mathematics AI Trainer",
    country: "🇺🇸 United States",
    avatar: "SC",
    rating: 5,
    text: "Velorix AI has completely transformed how I monetize my expertise. Working on cutting-edge AI training projects while maintaining full flexibility is incredible.",
    earned: "$8,400/month",
    color: "violet",
  },
  {
    name: "James Okafor",
    role: "Coding Expert Trainer",
    country: "🇳🇬 Nigeria",
    avatar: "JO",
    rating: 5,
    text: "The platform is incredibly professional. Fair pay, clear guidelines, and working on real AI systems that millions of people will use — that's meaningful work.",
    earned: "$6,200/month",
    color: "cyan",
  },
  {
    name: "Priya Sharma",
    role: "Healthcare AI Annotator",
    country: "🇮🇳 India",
    avatar: "PS",
    rating: 5,
    text: "As a medical professional, contributing to healthcare AI is deeply rewarding. Velorix made the onboarding process seamless and the pay is genuinely fair.",
    earned: "$5,800/month",
    color: "green",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="community" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-white mb-3"
          >
            Loved by Contributors Worldwide
          </motion.h2>
          <p className="text-gray-500">
            Join thousands of professionals already building the future of AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                      t.color === "violet"
                        ? "bg-violet-500/20 text-violet-400"
                        : t.color === "cyan"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{t.name}</div>
                    <div className="text-gray-600 text-xs">{t.role} · {t.country}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 text-sm font-bold">{t.earned}</div>
                  <div className="text-gray-600 text-xs">avg earnings</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}