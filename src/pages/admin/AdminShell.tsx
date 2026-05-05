import * as React from 'react';
import { NavLink, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { Card } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Select } from '@/src/components/ui/Select';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Search, Filter, Download, History, Settings as SettingsIcon, Plus, GripVertical, Trash2 } from 'lucide-react';

const ADMIN_NAV = [
  { label: 'Users', href: '/admin/users' },
  { label: 'Roles', href: '/admin/roles' },
  { label: 'Departments', href: '/admin/departments' },
  { label: 'Fields', href: '/admin/fields' },
  { label: 'Audit', href: '/admin/audit' },
  { label: 'Settings', href: '/admin/settings' },
];

export function AdminShell() {
  const location = useLocation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-main">Admin Control Panel</h1>
          <p className="text-sm text-text-muted mt-1">Configure system settings and manage organization resources</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-border bg-surface-2/20 p-1 rounded-lg w-fit">
        {ADMIN_NAV.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => cn(
              "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
              isActive 
                ? "bg-surface text-primary shadow-sm ring-1 ring-border" 
                : "text-text-muted hover:text-text-main hover:bg-surface-2/50"
            )}
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <Routes>
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="roles" element={<AdminRolesPage />} />
          <Route path="departments" element={<AdminDepartmentsPage />} />
          <Route path="fields" element={<AdminFieldsPage />} />
          <Route path="audit" element={<AdminAuditPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="/" element={<Navigate to="users" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function AdminDepartmentsPage() {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-text-main">Clinic Departments</h3>
        <Button size="sm">Add Department</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-surface-2/50 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3 border-b border-border">Department Name</th>
              <th className="text-left px-5 py-3 border-b border-border">Description</th>
              <th className="text-left px-5 py-3 border-b border-border">Active Admins</th>
              <th className="text-left px-5 py-3 border-b border-border">Status</th>
              <th className="text-right px-5 py-3 border-b border-border"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { name: 'Reception', desc: 'Front-desk patient intake and registration', admins: 3, status: 'Active' },
              { name: 'Pharmacy', desc: 'Medication dispensing and consultation', admins: 2, status: 'Active' },
              { name: 'Nursing', desc: 'In-patient care and medical assistance', admins: 5, status: 'Active' },
              { name: 'Lab', desc: 'Clinical testing and diagnostic services', admins: 2, status: 'Active' },
              { name: 'Kitchen', desc: 'Patient meal services and nutrition', admins: 1, status: 'Maintenance' },
            ].map((d, i) => (
              <tr key={i} className="hover:bg-surface-hover/50 transition-colors">
                <td className="px-5 py-4 text-[13px] font-semibold">{d.name}</td>
                <td className="px-5 py-4 text-[13px] text-text-muted">{d.desc}</td>
                <td className="px-5 py-4 text-[13px] text-text-main">{d.admins}</td>
                <td className="px-5 py-4">
                  <Badge variant={d.status === 'Active' ? 'success' : 'warn'}>{d.status}</Badge>
                </td>
                <td className="px-5 py-4 text-right">
                  <Button variant="ghost" size="sm" className="hidden group-hover:flex">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function AdminFieldsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text-main">Complaint Form Fields</h3>
        <Button size="sm" className="flex items-center gap-2">
          <Plus size={16} />
          <span>Add Custom Field</span>
        </Button>
      </div>

      <div className="space-y-3">
        {[
          { label: 'Patient Name', type: 'Text', required: true, core: true },
          { label: 'Patient MRN', type: 'Text (Regex)', required: true, core: true },
          { label: 'Incident Type', type: 'Dropdown', required: true, core: false },
          { label: 'Location / Room', type: 'Text', required: false, core: false },
          { label: 'Severity Score', type: 'Number', required: false, core: false },
        ].map((field, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg shadow-sm group">
            <div className="cursor-grab text-text-subtle group-hover:text-text-muted">
              <GripVertical size={20} />
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
              <div>
                <p className="text-sm font-semibold text-text-main">{field.label}</p>
                <p className="text-[11px] text-text-subtle font-mono uppercase tracking-widest">{field.type}</p>
              </div>
              <div className="flex items-center gap-2">
                {field.required ? (
                  <Badge variant="danger">Required</Badge>
                ) : (
                  <Badge>Optional</Badge>
                )}
              </div>
              <div className="text-sm text-text-muted">
                {field.core ? <span className="italic">Core Field</span> : <span>Dynamic</span>}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" className="hidden group-hover:flex">Edit</Button>
                {!field.core && (
                  <Button variant="ghost" size="sm" className="text-danger hidden group-hover:flex">
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Card title="Dropdown Options" subtitle="Configure values for the 'Incident Type' field">
        <div className="space-y-2 mt-4">
          {['Medication Error', 'Staff Behavior', 'Wait Time', 'Facility Issue'].map((opt, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded border border-border bg-surface-2/30">
              <span className="text-sm">{opt}</span>
              <Button variant="ghost" size="sm" className="p-1 h-auto text-text-subtle hover:text-danger">
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
          <div className="flex gap-2 mt-4">
            <Input className="mb-0" placeholder="New option name..." />
            <Button variant="secondary" className="h-10">Add</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ... remaining Admin subpages ...

function AdminAuditPage() {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-4 border-b border-border bg-surface-2/10">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle w-4 h-4" />
            <input 
              type="text" 
              placeholder="Filter by Actor or Complaint ID..." 
              className="w-full bg-surface border border-border-strong rounded-md h-9 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Select 
            className="h-9 py-0 text-xs w-[140px]" 
            options={[
              { label: 'All Actions', value: 'all' },
              { label: 'Created', value: 'create' },
              { label: 'Status Change', value: 'status' },
              { label: 'Deleted', value: 'delete' },
            ]} 
          />
          <Button variant="secondary" size="sm" className="h-9 flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6 relative">
          <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-border" />
          {[
            { actor: 'Sarah Johnson', action: 'Modified User Permissions', target: 'Nursing Manager', time: '10m ago', kind: 'primary' },
            { actor: 'Dr. Ahmad', action: 'Closed Complaint CTS-2026-0004', target: 'Lab', time: '1h ago', kind: 'success' },
            { actor: 'Admin', action: 'Reset Password', target: 'klee.staff', time: '3h ago', kind: 'danger' },
            { actor: 'System', action: 'Backup Successful', target: 'Cloud Storage', time: '12h ago', kind: 'muted' },
          ].map((log, i) => (
            <div key={i} className="relative pl-8">
              <div className={cn("absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-surface", 
                log.kind === 'primary' ? "bg-primary" : 
                log.kind === 'success' ? "bg-success" : 
                log.kind === 'danger' ? "bg-danger" : "bg-text-subtle"
              )} />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-text-main">{log.actor}</span>
                  <span className="text-[11px] text-text-subtle uppercase font-semibold">{log.time}</span>
                </div>
                <p className="text-[13px] text-text-main mt-0.5">{log.action}</p>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-text-muted">
                  <span className="font-mono bg-surface-2 px-1.5 py-0.5 rounded italic">Target: {log.target}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function AdminSettingsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="Organization Identity" subtitle="Global branding and naming">
        <div className="space-y-4">
          <Input label="Hospital Name" defaultValue="Hadi Clinic" />
          <Input label="System Prefix" defaultValue="CTS" hint="Used for Complaint Reference Numbers" />
          <div className="pt-2">
            <Button variant="primary">Update Identity</Button>
          </div>
        </div>
      </Card>
      
      <Card title="System Constraints" subtitle="Security and validation rules">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-md border border-border">
            <div>
              <p className="text-sm font-medium">Require Email Verification</p>
              <p className="text-xs text-text-muted">Users must verify email before first login</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-md border border-border">
            <div>
              <p className="text-sm font-medium">Allow Anonymous Reports</p>
              <p className="text-xs text-text-muted">Enable public-facing complaint form</p>
            </div>
            <input type="checkbox" className="w-4 h-4 rounded text-primary" />
          </div>
          <Input label="Attachment Max Size (MB)" type="number" defaultValue={2} />
        </div>
      </Card>

      <Card className="md:col-span-2" title="Database Configuration" subtitle="Low-level JSON settings editor">
        <div className="bg-slate-900 rounded-md p-4 font-mono text-xs text-blue-300 leading-relaxed overflow-x-auto">
          <pre>{`{
  "theme": "clinical-light",
  "features": {
    "audit_logs": true,
    "realtime_updates": true,
    "ai_classification": false
  },
  "retention_policy": "365d"
}`}</pre>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="secondary" size="sm">Reset to Defaults</Button>
        </div>
      </Card>
    </div>
  );
}

function AdminUsersPage() {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-text-main">System Users</h3>
        <Button size="sm">Add User</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-surface-2/50 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3 border-b border-border">Name</th>
              <th className="text-left px-5 py-3 border-b border-border">Role</th>
              <th className="text-left px-5 py-3 border-b border-border">Department</th>
              <th className="text-left px-5 py-3 border-b border-border">Status</th>
              <th className="text-left px-5 py-3 border-b border-border">Last Login</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { name: 'Sarah Johnson', role: 'ADMIN', dept: 'Reception', status: 'Active', login: '10m ago' },
              { name: 'Dr. Ahmad', role: 'MANAGER', dept: 'Pharmacy', status: 'Active', login: '2h ago' },
              { name: 'Kevin Lee', role: 'STAFF', dept: 'Nursing', status: 'Inactive', login: '5d ago' },
            ].map((u, i) => (
              <tr key={i} className="hover:bg-surface-hover/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center font-bold text-primary text-xs">{u.name.charAt(0)}</div>
                    <span className="text-[13px] font-medium">{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4"><span className="text-xs bg-surface-2 px-2 py-1 rounded text-text-main font-medium">{u.role}</span></td>
                <td className="px-5 py-4 text-[13px] text-text-muted">{u.dept}</td>
                <td className="px-5 py-4">
                  <Badge variant={u.status === 'Active' ? 'success' : 'default'}>{u.status}</Badge>
                </td>
                <td className="px-5 py-4 text-[13px] text-text-muted">{u.login}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function AdminRolesPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1 p-0 overflow-hidden" title="Roles">
        <div className="divide-y divide-border">
          {['Admins', 'Department Managers', 'General Staff', 'Auditors'].map((role, i) => (
            <div key={i} className={cn("p-4 cursor-pointer hover:bg-surface-hover transition-colors", i === 1 ? "bg-primary-bg border-r-2 border-r-primary" : "")}>
              <p className="text-sm font-semibold text-text-main">{role}</p>
              <p className="text-xs text-text-muted mt-1">Full system access for clinical oversight</p>
            </div>
          ))}
        </div>
      </Card>
      <Card className="lg:col-span-2" title="Permissions Grid" subtitle="Manage specific capabilities for the 'Department Managers' role">
        <div className="space-y-6 pt-2">
          {['Complaints', 'Users', 'Departments'].map((resource) => (
            <div key={resource} className="space-y-3">
              <h4 className="text-[13px] font-bold text-text-main uppercase tracking-tight pb-1 border-b border-border">{resource} Management</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Create', 'View All', 'Edit Own', 'Delete', 'Assign'].map((perm) => (
                  <label key={perm} className="flex items-center gap-3 p-3 rounded-md border border-border hover:bg-surface-2 transition-all cursor-pointer">
                    <input type="checkbox" defaultChecked={perm === 'View All'} className="w-4 h-4 rounded text-primary focus:ring-primary" />
                    <span className="text-[13px]">{perm} {resource}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
