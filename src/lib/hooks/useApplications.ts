"use client";

import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Application } from "@/lib/types";

export function useApplications(userId?: string) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setApplications(data as Application[]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const createApplication = useCallback(
    async (jobId: string, certificateUrl: string) => {
      if (!userId) throw new Error("Not authenticated");

      const { data, error: insertError } = await supabase
        .from("applications")
        .insert({
          user_id: userId,
          job_id: jobId,
          status: "pending_verification",
          certificate_url: certificateUrl,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      setApplications((prev) => [data as Application, ...prev]);
      return data;
    },
    [userId]
  );

  return {
    applications,
    loading,
    error,
    fetchApplications,
    createApplication,
  };
}