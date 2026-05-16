export interface Job {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryColor: string;
  payRange: string;
  payMin: number;
  payMax: number;
  contractType: string;
  location: string;
  tags: string[];
  description: string;
  skills: string[];
  duration: string;
  level: string;
  courseId: string;
  courseName: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  price: number;
  description: string;
  duration: string;
  level: string;
  modules: number;
  thumbnail: string;
  relatedJobCategory: string;
}

export interface UserProfile {
  id: string;
  authId: string;
  fullName: string;
  email: string;
  country: string;
  skills: string[];
  verificationStatus: "pending_verification" | "under_verification" | "approved" | "rejected";
  certificateUrl?: string;
  createdAt: string;
}

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: "pending_verification" | "under_verification" | "approved" | "rejected";
  certificateUrl: string;
  adminNotes?: string;
  createdAt: string;
}