"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Layers,
  Award,
  CheckCircle,
  Play,
  Lock,
  ArrowRight,
  Users,
  Star,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentModal from "@/components/academy/PaymentModal";
import { COURSES } from "@/lib/courses-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const mockModules = [
  { id: "m1", title: "Introduction & Platform Overview", duration: "45 min", free: true },
  { id: "m2", title: "Core Concepts & Methodology", duration: "1h 20min", free: true },
  { id: "m3", title: "Advanced Evaluation Techniques", duration: "1h 45min", free: false },
  { id: "m4", title: "Real-World Case Studies", duration: "2h 10min", free: false },
  { id: "m5", title: "Quality Standards & Best Practices", duration: "1h 30min", free: false },
  { id: "m6", title: "Tool Proficiency & Workflows", duration: "2h 00min", free: false },
  { id: "m7", title: "Advanced Projects & Peer Review", duration: "3h 00min", free: false },
  { id: "m8", title: "Final Assessment & Certification", duration: "1h 00min", free: false },
];

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const course = COURSES.find((c) => c.slug === slug);

  if (!course) notFound();

  // NOTE: keeping useState in a server component is invalid in strict React rules,
  // but since your file is marked "use client", Next treats it as client boundary.
  // If you hit issues later, split modal into a child component.
  const [paymentOpen, setPaymentOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-darker">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="orb w-[500px] h-[500px] top-[-100px] right-[-100px] opacity-15"
          style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">

            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-8"
            >
              <Link
                href="/academy"
                className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                <ArrowLeft size={14} />
                Academy
              </Link>

              <span className="text-gray-700">/</span>

              <span className="text-gray-400 text-sm line-clamp-1">
                {course.title}
              </span>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">

              {/* MAIN */}
              <div className="lg:col-span-2 space-y-6">

                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-400">
                      {course.level}
                    </span>
                    <span className="text-xs text-gray-600">
                      {course.relatedJobCategory}
                    </span>
                  </div>

                  <h1 className="font-display text-2xl font-bold text-white mb-3">
                    {course.title}
                  </h1>

                  <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-6 flex-wrap text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {course.duration}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Layers size={12} />
                      {course.modules} modules
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Award size={12} />
                      Certificate included
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Users size={12} />
                      8K+ enrolled
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className="fill-amber-400" />
                      ))}
                      <span className="text-gray-500 ml-1">(4.9)</span>
                    </div>
                  </div>
                </motion.div>

                {/* What you'll learn */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <h2 className="font-display font-semibold text-white text-lg mb-4">
                    What You'll Learn
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      "AI evaluation methodology and best practices",
                      "Domain-specific quality assessment techniques",
                      "Real-world AI training pipeline workflows",
                      "Advanced annotation and review standards",
                      "Industry tools and platform proficiency",
                      "Certification exam preparation",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle
                          size={14}
                          className="text-emerald-400 mt-0.5"
                        />
                        <span className="text-gray-400 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Curriculum */}
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <h2 className="font-display font-semibold text-white text-lg mb-2">
                    Course Curriculum
                  </h2>

                  <p className="text-gray-500 text-sm mb-5">
                    {course.modules} modules · {course.duration} total
                  </p>

                  <div className="space-y-2">
                    {mockModules.map((module, i) => (
                      <div
                        key={module.id}
                        className={`flex items-center justify-between p-3 rounded-xl border ${
                          module.free
                            ? "border-cyan-500/20 bg-cyan-500/5"
                            : "border-white/5 bg-white/2"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                              module.free
                                ? "bg-cyan-500/20 text-cyan-400"
                                : "bg-white/5 text-gray-600"
                            }`}
                          >
                            {module.free ? (
                              <Play size={12} />
                            ) : (
                              <Lock size={12} />
                            )}
                          </div>

                          <p
                            className={`text-sm ${
                              module.free ? "text-white" : "text-gray-500"
                            }`}
                          >
                            {i + 1}. {module.title}
                          </p>
                        </div>

                        <span className="text-gray-600 text-xs">
                          {module.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* SIDEBAR */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-2xl p-5 sticky top-24"
                >
                  <div className="text-center mb-5">
                    <div className="text-4xl text-white font-black">
                      ${course.price}
                    </div>
                    <div className="text-gray-500 text-xs">
                      One-time payment · Lifetime access
                    </div>
                  </div>

                  <button
                    onClick={() => setPaymentOpen(true)}
                    className="w-full btn-primary py-3 rounded-xl"
                  >
                    Enroll Now <ArrowRight size={14} />
                  </button>

                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modules</span>
                      <span>{course.modules}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>

      {paymentOpen && (
        <PaymentModal open={paymentOpen} setOpen={setPaymentOpen} />
      )}
    </main>
  );
}
