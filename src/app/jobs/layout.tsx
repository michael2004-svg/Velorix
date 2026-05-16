import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Training Jobs — Velorix AI",
  description:
    "Browse premium AI training jobs across mathematics, coding, cybersecurity, healthcare, legal, and more. Remote, flexible, and fairly paid.",
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}