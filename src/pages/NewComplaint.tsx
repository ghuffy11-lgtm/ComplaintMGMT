import * as React from 'react';
import { 
  ArrowLeft, 
  Plus, 
  X,
  Paperclip,
  Check
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Select } from '@/src/components/ui/Select';
import { useNavigate } from 'react-router-dom';

export default function NewComplaint() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Logic will be added once Firebase is ready
    setTimeout(() => {
      setIsLoading(false);
      navigate('/complaints');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="p-1 h-auto">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-main">New Complaint</h1>
          <p className="text-sm text-text-muted mt-1">Register a new patient feedback or incident</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pb-20">
        <Card title="Patient & Incident Details" subtitle="Basic information about the complaint source">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Complaint Date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} max={new Date().toISOString().split('T')[0]} />
            <Select 
              label="Incident Type" 
              required
              options={[
                { label: 'Select Type...', value: '' },
                { label: 'Medication Error', value: 'med_error' },
                { label: 'Staff Behavior', value: 'staff_behavior' },
                { label: 'Facility Issue', value: 'facility' },
                { label: 'Wait Time', value: 'wait_time' },
                { label: 'Other', value: 'other' },
              ]} 
            />
            <Input label="Patient Name" placeholder="Full name of the patient" required />
            <Input label="Patient MRN / ID" placeholder="e.g. MRN-1234" required />
          </div>
          <Input label="Location / Room" placeholder="e.g. Floor 2, Room 204" />
          <div className="field">
            <label className="text-[13px] font-medium text-text-main">Detailed Description</label>
            <textarea 
              className="flex min-h-[120px] w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-sm ring-offset-bg placeholder:text-text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              placeholder="Provide a thorough description of the complaint..."
              required
            />
          </div>
        </Card>

        <Card title="Classification" subtitle="Initial routing and priority assessment">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select 
              label="Priority" 
              required
              options={[
                { label: 'Normal', value: 'NORMAL' },
                { label: 'Low', value: 'LOW' },
                { label: 'High', value: 'HIGH' },
                { label: 'Critical', value: 'CRITICAL' },
              ]} 
            />
            <Select 
              label="Initial Department" 
              options={[
                { label: 'Auto-assign based on type', value: '' },
                { label: 'Reception', value: 'reception' },
                { label: 'Pharmacy', value: 'pharmacy' },
                { label: 'Nursing', value: 'nursing' },
                { label: 'Lab', value: 'lab' },
              ]} 
            />
          </div>
        </Card>

        <Card title="Attachments" subtitle="Upload supporting evidence (Images/PDFs)">
          <div className="space-y-4">
            <div className="dropzone">
              <Paperclip className="text-text-subtle" size={24} />
              <p className="text-sm font-medium">Click or drag files to upload</p>
              <p className="text-xs text-text-muted">Max 3 files · Image/PDF · 2 MB each</p>
            </div>
            {/* Upload Queue Placeholder */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-md bg-success-bg border border-success-border text-xs">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-success" />
                  <span className="font-medium">medical_report.pdf (450 KB)</span>
                </div>
                <Button variant="ghost" size="sm" className="p-0.5 h-auto"><X size={14} /></Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Sticky Footer Actions */}
        <div className="fixed bottom-0 left-[240px] right-0 bg-surface border-t border-border p-4 flex justify-end gap-3 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
          <Button variant="secondary" onClick={() => navigate('/complaints')}>Cancel</Button>
          <Button type="submit" isLoading={isLoading} className="flex items-center gap-2">
            <Plus size={18} />
            <span>Create Complaint</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
