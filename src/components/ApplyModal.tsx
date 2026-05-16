"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  User,
  Mail,
  Lock,
  Globe,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { Job } from "@/lib/types";

interface ApplyModalProps {
  job: Job;
  onClose: () => void;
}

type Step = "choice" | "register" | "success" | "academy";

export default function ApplyModal({ job, onClose }: ApplyModalProps) {
  const [step, setStep] = useState<Step>("choice");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [certFile, setCertFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "",
    skills: "",
    linkedin: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      // Lazy import — avoids client-side env crash
      const { supabase } = await import("@/lib/supabase");

      // 1. Create Supabase auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.fullName } },
      });

      if (authError) throw authError;

      let certificateUrl = "";

      // 2. Upload certificate if provided
      if (certFile && authData.user) {
        const ext = certFile.name.split(".").pop();
        const fileName = `${authData.user.id}/certificate_${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("certificates")
          .upload(fileName, certFile, { contentType: certFile.type });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("certificates")
          .getPublicUrl(fileName);

        certificateUrl = urlData.publicUrl;
      }

      // 3. Create user profile
      if (authData.user) {
        const { error: profileError } = await supabase
          .from("users_profiles")
          .insert({
            auth_id: authData.user.id,
            full_name: form.fullName,
            email: form.email,
            country: form.country,
            skills: form.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
            verification_status: "pending_verification",
            certificate_url: certificateUrl,
          });

        if (profileError) throw profileError;

        // 4. Create application record
        const { error: appError } = await supabase.from("applications").insert({
          user_id: authData.user.id,
          job_id: job.id,
          status: "pending_verification",
          certificate_url: certificateUrl,
        });

        if (appError) throw appError;
      }

      setStep("success");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Lock body scroll
  if (typeof window !== "undefined") {
    document.body.style.overflow = "hidden";
  }

  const handleClose = () => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "";
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay absolute inset-0"
        onClick={handleClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-lg glass-card rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/5">
          <div>
            <h2 className="font-display font-bold text-white text-xl mb-1">
              {step === "choice" && "Apply for Position"}
              {step === "register" && "Create Your Account"}
              {step === "success" && "Application Submitted!"}
              {step === "academy" && "Get Certified First"}
            </h2>
            <p className="text-gray-500 text-sm line-clamp-1">{job.title}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors ml-4 shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* ── STEP: CHOICE ── */}
            {step === "choice" && (
              <motion.div
                key="choice"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <p className="text-gray-400 text-sm mb-6">
                  Do you already have a{" "}
                  <span className="text-violet-400 font-medium">
                    {job.courseName}
                  </span>{" "}
                  certificate or equivalent?
                </p>

                {/* Has certificate */}
                <button
                  onClick={() => setStep("register")}
                  className="w-full p-4 rounded-xl border border-violet-500/30 bg-violet-500/8 hover:bg-violet-500/15 hover:border-violet-500/50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white text-sm mb-1 flex items-center gap-2">
                        <CheckCircle size={16} className="text-violet-400" />
                        Yes, I have a certificate
                      </div>
                      <p className="text-gray-500 text-xs">
                        Upload your certificate and create your account to apply
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-gray-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all shrink-0 ml-3"
                    />
                  </div>
                </button>

                {/* No certificate */}
                <button
                  onClick={() => setStep("academy")}
                  className="w-full p-4 rounded-xl border border-white/8 bg-white/3 hover:bg-white/6 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white text-sm mb-1 flex items-center gap-2">
                        <GraduationCap size={16} className="text-cyan-400" />
                        I don't have a certificate
                      </div>
                      <p className="text-gray-500 text-xs">
                        Get certified through Velorix Academy and unlock this job
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 ml-3"
                    />
                  </div>
                </button>
              </motion.div>
            )}

            {/* ── STEP: REGISTER ── */}
            {step === "register" && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Certificate upload */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Certificate Upload{" "}
                    <span className="text-violet-400">*</span>
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
                      certFile
                        ? "border-violet-500/50 bg-violet-500/8"
                        : "border-white/10 hover:border-violet-500/30 hover:bg-white/3"
                    }`}
                    onClick={() =>
                      document.getElementById("cert-upload")?.click()
                    }
                  >
                    <input
                      id="cert-upload"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) =>
                        setCertFile(e.target.files?.[0] || null)
                      }
                    />
                    {certFile ? (
                      <div className="flex items-center justify-center gap-2 text-violet-400 text-sm">
                        <CheckCircle size={16} />
                        <span className="truncate max-w-[260px]">
                          {certFile.name}
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload
                          size={24}
                          className="mx-auto mb-2 text-gray-600"
                        />
                        <p className="text-gray-500 text-xs">
                          Click to upload certificate
                        </p>
                        <p className="text-gray-700 text-xs mt-1">
                          PDF, JPG, or PNG accepted
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Name + Country */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    icon={<User size={14} />}
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={(v) => setForm({ ...form, fullName: v })}
                  />
                  <FormField
                    icon={<Globe size={14} />}
                    placeholder="Country"
                    value={form.country}
                    onChange={(v) => setForm({ ...form, country: v })}
                  />
                </div>

                {/* Email */}
                <FormField
                  icon={<Mail size={14} />}
                  placeholder="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />

                {/* Password */}
                <FormField
                  icon={<Lock size={14} />}
                  placeholder="Create Password (min 6 chars)"
                  type="password"
                  value={form.password}
                  onChange={(v) => setForm({ ...form, password: v })}
                />

                {/* Skills */}
                <div>
                  <input
                    className="w-full px-3 py-2.5 bg-[#0F0F1A] border border-white/8 rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all"
                    placeholder="Skills (comma separated e.g. Python, Math)"
                    value={form.skills}
                    onChange={(e) =>
                      setForm({ ...form, skills: e.target.value })
                    }
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <input
                    className="w-full px-3 py-2.5 bg-[#0F0F1A] border border-white/8 rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500/40 transition-all"
                    placeholder="LinkedIn URL (optional)"
                    value={form.linkedin}
                    onChange={(e) =>
                      setForm({ ...form, linkedin: e.target.value })
                    }
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setStep("choice");
                      setError("");
                    }}
                    className="px-4 py-2.5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={
                      loading ||
                      !form.fullName ||
                      !form.email ||
                      !form.password ||
                      form.password.length < 6
                    }
                    className="flex-1 btn-primary py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-gray-700 text-xs text-center">
                  By applying you agree to our Terms of Service and Privacy Policy
                </p>
              </motion.div>
            )}

            {/* ── STEP: SUCCESS ── */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-5"
                >
                  <CheckCircle size={32} className="text-violet-400" />
                </motion.div>

                <h3 className="font-display font-bold text-white text-xl mb-2">
                  Application Submitted!
                </h3>
                <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
                  Your application for{" "}
                  <span className="text-white font-medium">{job.title}</span> is
                  now under review. We'll verify your certificate and get back to
                  you within 48 hours.
                </p>

                {/* Status pipeline */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[
                    { label: "Submitted", active: true },
                    { label: "Verification", active: false },
                    { label: "Approved", active: false },
                  ].map((s, i, arr) => (
                    <div key={s.label} className="flex items-center gap-1">
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            s.active
                              ? "bg-violet-500 status-pulse"
                              : "bg-white/15"
                          }`}
                        />
                        <span
                          className={`text-xs ${
                            s.active ? "text-violet-400" : "text-gray-600"
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-6 h-px bg-white/10 mb-4" />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleClose}
                  className="btn-primary px-10 py-2.5 rounded-xl text-white text-sm font-semibold"
                >
                  Done
                </button>
              </motion.div>
            )}

            {/* ── STEP: ACADEMY ── */}
            {step === "academy" && (
              <motion.div
                key="academy"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.05 }}
                  className="w-16 h-16 rounded-2xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center mx-auto mb-5"
                >
                  <GraduationCap size={32} className="text-cyan-400" />
                </motion.div>

                <h3 className="font-display font-bold text-white text-xl mb-2">
                  Velorix Academy
                </h3>
                <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
                  Get your{" "}
                  <span className="text-cyan-400 font-medium">
                    {job.courseName}
                  </span>{" "}
                  certification to qualify for this role and start earning.
                </p>

                {/* Course preview card */}
                <div className="glass-card rounded-xl p-4 mb-6 text-left">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white text-sm font-medium line-clamp-1 flex-1 mr-3">
                      {job.courseName}
                    </span>
                    <span className="text-cyan-400 font-bold shrink-0">
                      From $119
                    </span>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {["Self-paced", "Certificate included", "Lifetime access"].map(
                      (item) => (
                        <span
                          key={item}
                          className="text-xs text-gray-500 flex items-center gap-1"
                        >
                          <CheckCircle size={10} className="text-emerald-400" />
                    
                            {item}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setStep("choice");
                      setError("");
                    }}
                    className="px-4 py-2.5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Back
                  </button>
                  <a
                    href="/academy"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        document.body.style.overflow = "";
                      }
                    }}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-cyan-500 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <GraduationCap size={14} />
                    Go to Velorix Academy
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function FormField({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-3 py-2.5 bg-[#0F0F1A] border border-white/8 rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all"
      />
    </div>
);
}
