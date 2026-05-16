import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { applicationId, status, adminNotes } = await req.json();

    if (!["pending_verification", "under_verification", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Update application status
    const { error: appError } = await supabaseAdmin
      .from("applications")
      .update({ status, admin_notes: adminNotes })
      .eq("id", applicationId);

    if (appError) throw appError;

    // If approved, also update user profile verification status
    if (status === "approved") {
      const { data: app } = await supabaseAdmin
        .from("applications")
        .select("user_id")
        .eq("id", applicationId)
        .single();

      if (app) {
        await supabaseAdmin
          .from("users_profiles")
          .update({ verification_status: "approved" })
          .eq("auth_id", app.user_id);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}