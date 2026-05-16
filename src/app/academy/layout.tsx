import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velorix Academy — Get Certified for AI Training Jobs",
  description:
    "Earn industry-recognized AI training certifications. Self-paced courses, downloadable certificates, and direct job eligibility on Velorix AI.",
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}