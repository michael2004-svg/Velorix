"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function submitApplication(data: {
  jobId: string;
  certificateUrl: string;
  fullName: string;
  email: string;
  country: string;
  skills: string[];
}) {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Check for existing application
  const { data: existing } = await supabase
    .from("applications")
    .select("id")
    .eq("user_id", user.id)
    .eq("job_id", data.jobId)
    .single();

  if (existing) {
    return { error: "You have already applied for this position." };
  }

  const { error } = await supabase.from("applications").insert({
    user_id: user.id,
    job_id: data.jobId,
    status: "pending_verification",
    certificate_url: data.certificateUrl,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function updateApplicationStatus(
  applicationId: string,
  status: "pending_verification" | "under_verification" | "approved" | "rejected",
  adminNotes?: string
) {
  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase
    .from("applications")
    .update({ status, admin_notes: adminNotes })
    .eq("id", applicationId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}