"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/academy/CourseCard";
import PaymentModal from "@/components/academy/PaymentModal";
import { COURSES } from "@/lib/courses-data";
import { Course } from "@/lib/types";
import { GraduationCap, BookOpen, Award, Users } from "lucide-react";

const academyStats = [
  { icon: BookOpen, value: "50+", label: "Courses" },
  { icon: Users, value: "8K+", label: "Students" },
  { icon: Award, value: "95%", label: "Completion Rate" },
  { icon: GraduationCap, value: "100%", label: "Job Eligible" },
];

export default function AcademyPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
    setPaymentModalOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-darker">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="orb w-[500px] h-[500px] top-[-100px] right-[-100px] opacity-15"
          style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }}
        />
        <div
          className="orb w-[400px] h-[400px] bottom-[10%] left-[-100px] opacity-10"
          style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div
            className="absolute inset-0 opacity-50"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(6,182,212,0.2) 0%, transparent 70%)" }}
          />

          <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-medium mb-6"
            >
              <GraduationCap size={12} />
              Velorix Academy
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Get Certified.
              <br />
              <span className="text-cyan-400">Unlock AI Jobs.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg max-w-xl mx-auto mb-10"
            >
              Industry-recognized certifications that open doors to premium AI training
              opportunities. Learn at your own pace. Earn on your own terms.
            </motion.p>

            {/* Academy stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              {academyStats.map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl p-3 text-center">
                  <stat.icon size={16} className="mx-auto mb-1 text-cyan-400" />
                  <div className="font-display font-bold text-white text-xl">{stat.value}</div>
                  <div className="text-gray-600 text-xs">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Courses */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-white mb-2">
                Available Certification Courses
              </h2>
              <p className="text-gray-500 text-sm">
                Each course is designed to qualify you for specific AI training roles
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COURSES.map((course, i) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  index={i}
                  onEnroll={handleEnroll}
                />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {paymentModalOpen && selectedCourse && (
        <PaymentModal
          course={selectedCourse}
          onClose={() => {
            setPaymentModalOpen(false);
            setSelectedCourse(null);
          }}
        />
      )}
    </main>
  );
}