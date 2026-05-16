"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle, XCircle, AlertCircle, Eye,
  ExternalLink, ChevronDown, ChevronUp
} from "lucide-react";
import Badge from "@/components/ui/Badge";

interface Application {
  id: string;
  name: string;
  email?: string;
  job: string;
  status: string;
  date: string;
  cert: string;
  adminNotes?: string;
}

interface ApplicationsTableProps {
  applications: Application[];
  onStatusChange: (id: string, status: string, notes?: string) => void;
}

const statusBadgeVariant: Record<string, any> = {
  pending_verification: "amber",
  under_verification: "blue",
  approved: "green",
  rejected: "red",
};

const statusLabel: Record<string, string> = {
  pending_verification: "Pending Review",
  under_verification: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
};

export default function ApplicationsTable({
  applications,
  onStatusChange,
}: ApplicationsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            {["Applicant", "Job Role", "Date Applied", "Status", "Actions"].map(
              (h) => (
                <th
                  key={h}
                  className="text-left text-gray-600 text-xs font-medium pb-3 pr-4"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {applications.map((app, i) => (
            <>
              <motion.tr
                key={app.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-white/3 hover:bg-white/2 transition-colors"
              >
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 text-xs font-bold shrink-0">
                      {app.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">{app.name}</div>
                      {app.email && (
                        <div className="text-gray-600 text-xs">{app.email}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <div className="text-gray-400 text-xs max-w-[180px] truncate">{app.job}</div>
                </td>
                <td className="py-3 pr-4">
                  <div className="text-gray-600 text-xs">{app.date}</div>
                </td>
                <td className="py-3 pr-4">
                  <Badge variant={statusBadgeVariant[app.status]} dot>
                    {statusLabel[app.status]}
                  </Badge>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onStatusChange(app.id, "approved")}
                      className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-gray-600 hover:text-emerald-400 transition-colors"
                      title="Approve"
                    >
                      <CheckCircle size={14} />
                    </button>
                    <button
                      onClick={() => onStatusChange(app.id, "rejected", notesMap[app.id])}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-colors"
                      title="Reject"
                    >
                      <XCircle size={14} />
                    </button>
                    <button
                      onClick={() => onStatusChange(app.id, "under_verification")}
                      className="p-1.5 rounded-lg hover:bg-blue-500/10 text-gray-600 hover:text-blue-400 transition-colors"
                      title="Mark Under Review"
                    >
                      <AlertCircle size={14} />
                    </button>
                    <a
                      href={`/certificates/${app.cert}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-violet-500/10 text-gray-600 hover:text-violet-400 transition-colors"
                      title="View Certificate"
                    >
                      <ExternalLink size={14} />
                    </a>
                    <button
                      onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                      className="p-1.5 rounded-lg hover:bg-white/5 text-gray-600 hover:text-gray-400 transition-colors"
                      title="Expand"
                    >
                      {expandedId === app.id ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>
                  </div>
                </td>
              </motion.tr>

              {/* Expanded row */}
              {expandedId === app.id && (
                <tr key={`${app.id}-expanded`} className="border-b border-white/3">
                  <td colSpan={5} className="pb-3 pt-1">
                    <div className="bg-white/3 rounded-xl p-4 ml-10">
                      <p className="text-gray-500 text-xs font-medium mb-2">Admin Notes</p>
                      <textarea
                        className="w-full px-3 py-2 bg-[#0F0F1A] border border-white/8 rounded-lg text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500/40 resize-none"
                        rows={2}
                        placeholder="Add notes for this application..."
                        value={notesMap[app.id] || ""}
                        onChange={(e) =>
                          setNotesMap({ ...notesMap, [app.id]: e.target.value })
                        }
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() =>
                            onStatusChange(app.id, "approved", notesMap[app.id])
                          }
                          className="px-3 py-1.5 bg-emerald-500/15 text-emerald-400 text-xs rounded-lg hover:bg-emerald-500/25 transition-colors font-medium"
                        >
                          Approve with notes
                        </button>
                        <button
                          onClick={() =>
                            onStatusChange(app.id, "rejected", notesMap[app.id])
                          }
                          className="px-3 py-1.5 bg-red-500/15 text-red-400 text-xs rounded-lg hover:bg-red-500/25 transition-colors font-medium"
                        >
                          Reject with notes
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>

      {applications.length === 0 && (
        <div className="text-center py-10 text-gray-600">
          <Eye size={24} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">No applications found</p>
        </div>
      )}
    </div>
  );
}