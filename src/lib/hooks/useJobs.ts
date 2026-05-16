"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Job } from "@/lib/types";
import { JOBS } from "@/lib/jobs-data";

interface UseJobsOptions {
  category?: string;
  search?: string;
  payMin?: number;
  payMax?: number;
  level?: string;
}

export function useJobs(options: UseJobsOptions = {}) {
  const [jobs, setJobs] = useState<Job[]>(JOBS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const filtered = JOBS.filter((job) => {
      const matchCategory =
        !options.category ||
        options.category === "All Jobs" ||
        job.category === options.category;
      const matchSearch =
        !options.search ||
        job.title.toLowerCase().includes(options.search.toLowerCase()) ||
        job.description.toLowerCase().includes(options.search.toLowerCase());
      const matchPayMin = !options.payMin || job.payMin >= options.payMin;
      const matchPayMax = !options.payMax || job.payMax <= options.payMax;
      const matchLevel =
        !options.level ||
        options.level === "all" ||
        job.level.toLowerCase() === options.level.toLowerCase();

      return matchCategory && matchSearch && matchPayMin && matchPayMax && matchLevel;
    });

    setJobs(filtered);
  }, [options.category, options.search, options.payMin, options.payMax, options.level]);

  return { jobs, loading };
}

export function useJobBySlug(slug: string) {
  const job = JOBS.find((j) => j.slug === slug);
  return { job, loading: false };
}