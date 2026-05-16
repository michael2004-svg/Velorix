"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, User, Globe, AlertCircle, Zap, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.fullName } },
      });
      if (authError) throw authError;

      if (data.user) {
        await supabase.from("users_profiles").insert({
          auth_id: data.user.id,
          full_name: form.fullName,
          email: form.email,
          country: form.country,
          skills: [],
          verification_status: "pending_verification",
        });
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "fullName", icon: User, placeholder: "Full Name", type: "text" },
    { key: "email", icon: Mail, placeholder: "Email Address", type: "email" },
    { key: "password", icon: Lock, placeholder: "Create Password", type: "password" },
    { key: "country", icon: Globe, placeholder: "Country", type: "text" },
  ];

  return (
    <div className="min-h-screen bg-darker flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.3) 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-glow-violet">
              <Zap size={18} className="text-white fill-white" />
            </div>
            <span className="font-display font-bold text-white text-xl">
              Velorix <span className="gradient-text-violet">AI</span>
            </span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm">Start earning from your AI expertise</p>
        </div>

        <div className="glass-card rounded-2xl p-6 space-y-3">
          {fields.map(({ key, icon: Icon, placeholder, type }) => (
            <div key={key} className="relative">
              <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type={type}
                placeholder={placeholder}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full pl-9 pr-4 py-3 bg-[#0A0A0F] border border-white/8 rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all"
              />
            </div>
          ))}

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            onClick={handleSignup}
            disabled={loading || !form.fullName || !form.email || !form.password}
            className="w-full btn-primary py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Create Account <ArrowRight size={14} /></>
            )}
          </button>

          <p className="text-gray-600 text-xs text-center pt-1">
            By signing up, you agree to our{" "}
            <Link href="#" className="text-violet-400 hover:text-violet-300">Terms of Service</Link>
            {" "}and{" "}
            <Link href="#" className="text-violet-400 hover:text-violet-300">Privacy Policy</Link>
          </p>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}