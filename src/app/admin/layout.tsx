import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Velorix AI",
  description: "Velorix AI administration panel.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}