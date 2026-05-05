import * as React from 'react';
import { 
  ArrowLeft, 
  Lock, 
  FileText, 
  Paperclip, 
  History,
  Save,
  RotateCcw,
  UserPlus,
  Download,
  Eye
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Card } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Select } from '@/src/components/ui/Select';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate, formatRelativeTime } from '@/src/lib/utils';

export default function ComplaintDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = React.useState(false);

  // Mock data
  const complaint = {
    id: id || 'CTS-2026-0001',
    status: 'OPEN',
    priority: 'CRITICAL',
    dept: 'Pharmacy',
    assignedTo: 'Dr. Ahmad',
    complaintDate: '2026-05-01',
    createdAt: '2026-05-01T10:00:00Z',
    updatedAt: '2026-05-02T14:30:00Z',
    createdBy: 'sjohnson',
    fields: {
      patientName: 'John Doe',
      patientId: 'MRN-4859',
      location: 'Floor 2, Room 204',
      description: 'Patient reported delayed medication delivery and incorrect dosage information on the label.',
      incidentType: 'Medication Error'
    }
  };

  const isLocked = complaint.status === 'CLOSED' || complaint.status === 'RESOLVED';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="p-1 h-auto">
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-text-main">{complaint.id}</h1>
            <Badge variant={complaint.status.toLowerCase() as any}>{complaint.status}</Badge>
            <Badge variant={complaint.priority.toLowerCase() === 'critical' ? 'danger' : 'primary'}>{complaint.priority}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="flex items-center gap-2">
            <RotateCcw size={16} />
            <span>Reopen</span>
          </Button>
          <Button variant="primary" size="sm" className="flex items-center gap-2">
            <UserPlus size={16} />
            <span>Assign</span>
          </Button>
        </div>
      </div>

      {isLocked && (
        <div className="bg-warn-bg border border-warn-border text-warn text-sm p-3 rounded-md flex items-center gap-3">
          <Lock size={16} />
          <span>This complaint is <strong>{complaint.status.toLowerCase()}</strong>. Editing is disabled.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Fields Card */}
          <Card 
            title="Fields" 
            headerAction={
              !isLocked && (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              )
            }
          >
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-text-muted uppercase">Patient Name</label>
                  <p className="text-[14px]">{complaint.fields.patientName}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-text-muted uppercase">Patient ID</label>
                  <p className="text-[14px] font-mono">{complaint.fields.patientId}</p>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-text-muted uppercase">Incident Type</label>
                <p className="text-[14px]">{complaint.fields.incidentType}</p>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-text-muted uppercase">Location</label>
                <p className="text-[14px]">{complaint.fields.location}</p>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-text-muted uppercase">Description</label>
                <div className="p-3 bg-surface-2 rounded-md text-[14px] text-text-main leading-relaxed">
                  {complaint.fields.description}
                </div>
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                <Button variant="secondary" size="sm">Discard</Button>
                <Button variant="primary" size="sm" className="flex items-center gap-2">
                  <Save size={16} />
                  <span>Save Changes</span>
                </Button>
              </div>
            )}
          </Card>

          {/* Attachments Card */}
          <Card title="Attachments" subtitle="Images and documents related to this case">
            <div className="space-y-4">
              {!isLocked && (
                <div className="dropzone">
                  <Paperclip className="text-text-subtle" size={24} />
                  <p className="text-sm font-medium">Click or drag files to upload</p>
                  <p className="text-xs text-text-muted">Max 3 files · Image/PDF · 2 MB</p>
                </div>
              )}
              <div className="divide-y divide-border border rounded-md">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-surface-hover/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-surface-2 rounded">
                        <FileText size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">dosage_error_photo_{i}.jpg</p>
                        <p className="text-xs text-text-muted">1.2 MB · Uploaded by {complaint.createdBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="p-1 h-auto text-text-subtle">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1 h-auto text-text-subtle">
                        <Download size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Activity Log */}
          <Card title="Activity" subtitle="Journal of all changes and actions">
            <div className="space-y-6 mt-4 relative">
              <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-border" />
              {[
                { actor: 'Sarah Johnson', action: 'Reassigned complaint to Medical Staff', time: '1h ago', details: 'Direct assignment requested by dept head' },
                { actor: 'Admin', action: 'Updated status to In Progress', time: '2h ago' },
                { actor: 'Hadi Bot', action: 'Complaint registered in system', time: '1d ago' },
              ].map((log, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-surface bg-primary" />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-text-main">{log.actor}</span>
                      <span className="text-xs text-text-muted">{log.time}</span>
                    </div>
                    <p className="text-sm text-text-main mt-1">{log.action}</p>
                    {log.details && (
                      <div className="mt-2 text-xs text-text-muted bg-surface-2 p-2 rounded italic">
                        {log.details}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Metadata */}
        <div className="space-y-6">
          <Card title="State">
            <div className="space-y-4">
              <Select 
                label="Status" 
                disabled={isLocked}
                options={[
                  { label: 'Open', value: 'OPEN' },
                  { label: 'In Progress', value: 'IN_PROGRESS' },
                  { label: 'Resolved', value: 'RESOLVED' },
                  { label: 'Closed', value: 'CLOSED' },
                ]} 
              />
              <Select 
                label="Priority" 
                disabled={isLocked}
                options={[
                  { label: 'Low', value: 'LOW' },
                  { label: 'Normal', value: 'NORMAL' },
                  { label: 'High', value: 'HIGH' },
                  { label: 'Critical', value: 'CRITICAL' },
                ]} 
              />
              <Input 
                label="Complaint Date" 
                type="date" 
                defaultValue={complaint.complaintDate}
                disabled={isLocked}
              />
              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Department</span>
                  <Badge>{complaint.dept}</Badge>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Assigned to</span>
                  <span className="font-medium">{complaint.assignedTo}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-border space-y-2 text-[10px] text-text-subtle uppercase font-semibold">
                <p>Created: {formatDate(complaint.createdAt)}</p>
                <p>Updated: {formatRelativeTime(complaint.updatedAt)}</p>
              </div>
            </div>
          </Card>

          <Card title="Assignment History">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs p-2 rounded-md border border-border bg-surface-2/30">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold">R</div>
                <div>
                  <p className="font-medium">Reception</p>
                  <p className="text-text-muted">Initial Routing</p>
                </div>
              </div>
              <div className="flex items-center justify-center py-1">
                <ArrowLeft size={14} className="rotate-[-90deg] text-text-subtle" />
              </div>
              <div className="flex items-center gap-3 text-xs p-2 rounded-md border border-border bg-primary-bg">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">P</div>
                <div>
                  <p className="font-medium">Pharmacy</p>
                  <p className="text-text-muted">Current Assignment</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
