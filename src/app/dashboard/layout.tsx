import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Velorix AI",
  description: "Your Velorix AI contributor dashboard.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}