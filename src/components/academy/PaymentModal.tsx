"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { Course } from "@/lib/types";

interface PaymentModalProps {
  course: Course;
  onClose: () => void;
}

declare global {
  interface Window {
    paypal: any;
  }
}

export default function PaymentModal({ course, onClose }: PaymentModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const paypalRef = useRef<HTMLDivElement>(null);
  const buttonsRendered = useRef(false);

  useEffect(() => {
    if (buttonsRendered.current) return;

    const loadPayPal = async () => {
      setStatus("loading");

      // Load PayPal SDK
      if (!window.paypal) {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=AQ1vLE7ijyV2OAKGtkEdqe68eP25KIgTEAoZZnhfvw0L1mgnI0AdMd6YhS35JfLSh9RejcY_q2_JtOmu&currency=USD`;
        script.async = true;
        script.onload = () => renderButtons();
        script.onerror = () => {
          setStatus("error");
          setErrorMessage("Failed to load PayPal. Please try again.");
        };
        document.body.appendChild(script);
      } else {
        renderButtons();
      }
    };

    const renderButtons = () => {
      if (!paypalRef.current || buttonsRendered.current) return;
      buttonsRendered.current = true;
      setStatus("idle");

      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "black",
            shape: "rect",
            label: "pay",
            height: 44,
          },
          createOrder: (_data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: course.title,
                  amount: {
                    currency_code: "USD",
                    value: course.price.toFixed(2),
                  },
                },
              ],
            });
          },
          onApprove: async (_data: any, actions: any) => {
            setStatus("loading");
            try {
              const order = await actions.order.capture();
              // Save payment to Supabase
              const { supabase } = await import("@/lib/supabase");
              await supabase.from("payments").insert({
                course_id: course.id,
                paypal_order_id: order.id,
                amount: course.price,
                status: "completed",
              });
              setStatus("success");
            } catch {
              setStatus("error");
              setErrorMessage("Payment capture failed. Please contact support.");
            }
          },
          onError: (err: any) => {
            console.error("PayPal error:", err);
            setStatus("error");
            setErrorMessage("Payment failed. Please try again.");
          },
        })
        .render(paypalRef.current);
    };

    loadPayPal();
  }, [course]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="modal-overlay absolute inset-0"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md glass-card rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/5">
          <div>
            <h2 className="font-display font-bold text-white text-xl mb-1">Enroll in Course</h2>
            <p className="text-gray-500 text-sm line-clamp-1">{course.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-emerald-400" />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-2">
                  Enrollment Successful!
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  Welcome to <span className="text-white">{course.title}</span>.
                  Your course dashboard is now ready.
                </p>
                <p className="text-gray-600 text-xs mb-6">
                  Your certificate will be available upon course completion.
                </p>
                <button
                  onClick={onClose}
                  className="btn-primary px-8 py-2.5 rounded-xl text-white text-sm font-semibold"
                >
                  Go to Dashboard
                </button>
              </motion.div>
            ) : (
              <motion.div key="payment" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Course summary */}
                <div className="glass-card rounded-xl p-4 mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400 text-sm">{course.title}</span>
                    <span className="font-display font-bold text-white text-xl">${course.price}</span>
                  </div>
                  <div className="flex gap-3 text-xs text-gray-600">
                    <span>✓ {course.duration}</span>
                    <span>✓ {course.modules} modules</span>
                    <span>✓ Lifetime access</span>
                    <span>✓ Certificate</span>
                  </div>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs mb-4">
                    <AlertCircle size={14} />
                    {errorMessage}
                  </div>
                )}

                {/* PayPal buttons container */}
                <div ref={paypalRef} className="mb-4 min-h-[60px]">
                  {status === "loading" && (
                    <div className="flex items-center justify-center py-6">
                      <div className="w-6 h-6 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                    </div>
                  )}
                </div>

                {/* Security note */}
                <div className="flex items-center justify-center gap-2 text-gray-600 text-xs">
                  <Shield size={12} />
                  Secured by PayPal · 256-bit SSL encryption
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}