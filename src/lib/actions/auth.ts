"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;
  const country = formData.get("country") as string;

  const supabase = createServerActionClient({ cookies });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    await supabase.from("users_profiles").insert({
      auth_id: data.user.id,
      full_name: fullName,
      email,
      country,
      skills: [],
      verification_status: "pending_verification",
    });
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = createServerActionClient({ cookies });
  await supabase.auth.signOut();
  redirect("/");
}