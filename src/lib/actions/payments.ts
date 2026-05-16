"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function recordPayment(data: {
  courseId: string;
  paypalOrderId: string;
  amount: number;
}) {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("payments").insert({
    user_id: user?.id,
    course_id: data.courseId,
    paypal_order_id: data.paypalOrderId,
    amount: data.amount,
    status: "completed",
  });

  if (error) {
    return { error: error.message };
  }

  // Create course progress entry
  if (user) {
    await supabase.from("course_progress").upsert({
      user_id: user.id,
      course_id: data.courseId,
      completion_percentage: 0,
    });
  }

  return { success: true };
}

export async function getCoursePaymentStatus(courseId: string) {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { purchased: false };

  const { data } = await supabase
    .from("payments")
    .select("id")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .eq("status", "completed")
    .single();

  return { purchased: !!data };
}