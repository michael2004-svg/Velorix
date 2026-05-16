import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { userId, courseId } = await req.json();

    // Verify course completion
    const { data: progress } = await supabaseAdmin
      .from("course_progress")
      .select("completion_percentage")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .single();

    if (!progress || progress.completion_percentage < 100) {
      return NextResponse.json(
        { error: "Course not completed" },
        { status: 400 }
      );
    }

    // Check if certificate already exists
    const { data: existing } = await supabaseAdmin
      .from("certificates")
      .select("id")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .single();

    if (existing) {
      return NextResponse.json({ message: "Certificate already issued", certificateId: existing.id });
    }

    // Issue certificate
    const { data: cert, error } = await supabaseAdmin
      .from("certificates")
      .insert({
        user_id: userId,
        course_id: courseId,
        certificate_url: `/certificates/${userId}/${courseId}.pdf`, // Would be generated PDF URL
        issued_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, certificate: cert });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}