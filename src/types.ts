export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  username: string;
  role: UserRole;
  departmentId: string;
  isActive: boolean;
  createdAt: number;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export type ComplaintStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED' | 'REJECTED';
export type ComplaintPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';

export interface DynamicFieldConfig {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select';
  options?: string[]; // For 'select' type
  required: boolean;
  order: number;
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: number;
  uploadedBy: string;
}

export interface ActivityLog {
  id: string;
  complaintId: string;
  action: string;
  actorId: string;
  actorName: string;
  timestamp: number;
  details?: any;
  actionColor?: string; // 'primary' | 'warn' | 'danger' | 'success'
}

export interface Complaint {
  id: string; // The reference number (e.g., CTS-2026-0001)
  status: ComplaintStatus;
  priority: ComplaintPriority;
  departmentId?: string;
  assignedToId?: string;
  complaintDate: number; // timestamp
  dynamicFields: Record<string, any>;
  attachments: Attachment[];
  history: ActivityLog[];
  createdAt: number;
  updatedAt: number;
  createdBy: string;
}

export interface AppSettings {
  organizationName: string;
  referencePrefix: string;
  allowAnonymous?: boolean;
}
