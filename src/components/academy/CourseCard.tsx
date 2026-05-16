"use client";

import { motion } from "framer-motion";
import { Clock, BookOpen, Award, ArrowRight, Layers } from "lucide-react";
import { Course } from "@/lib/types";

interface CourseCardProps {
  course: Course;
  index: number;
  onEnroll: (course: Course) => void;
}

const levelColors: Record<string, string> = {
  Beginner: "text-emerald-400 bg-emerald-500/10",
  Intermediate: "text-cyan-400 bg-cyan-500/10",
  Advanced: "text-violet-400 bg-violet-500/10",
  Senior: "text-amber-400 bg-amber-500/10",
  Expert: "text-pink-400 bg-pink-500/10",
};

export default function CourseCard({ course, index, onEnroll }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl overflow-hidden group"
    >
      {/* Thumbnail placeholder */}
      <div className="h-36 bg-gradient-to-br from-violet-900/40 to-cyan-900/20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen size={40} className="text-violet-400/40" />
        </div>
        <div
          className="absolute bottom-0 right-0 w-32 h-32 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)", transform: "translate(30%, 30%)" }}
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[course.level] || levelColors.Intermediate}`}>
            {course.level}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display font-semibold text-white text-base mb-2 group-hover:text-violet-300 transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center gap-1.5 text-gray-600 text-xs">
            <Clock size={12} />
            {course.duration}
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 text-xs">
            <Layers size={12} />
            {course.modules} modules
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 text-xs">
            <Award size={12} />
            Certificate
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display font-bold text-white text-2xl">${course.price}</span>
            <span className="text-gray-600 text-xs ml-1">one-time</span>
          </div>
          <button
            onClick={() => onEnroll(course)}
            className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-semibold"
          >
            Enroll Now
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}