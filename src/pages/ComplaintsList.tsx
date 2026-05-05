import * as React from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  X
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Select } from '@/src/components/ui/Select';
import { Badge } from '@/src/components/ui/Badge';
import { Card } from '@/src/components/ui/Card';
import { useNavigate } from 'react-router-dom';

export default function ComplaintsList() {
  const navigate = useNavigate();
  const [isFilterActive, setIsFilterActive] = React.useState(false);

  // Sample data
  const complaints = [
    { id: 'CTS-2026-0001', status: 'OPEN', priority: 'CRITICAL', date: '2026-05-01', updated: '2h ago', dept: 'Pharmacy' },
    { id: 'CTS-2026-0002', status: 'IN_PROGRESS', priority: 'HIGH', date: '2026-05-02', updated: '1d ago', dept: 'Reception' },
    { id: 'CTS-2026-0003', status: 'RESOLVED', priority: 'NORMAL', date: '2026-05-02', updated: '3d ago', dept: 'Nursing' },
    { id: 'CTS-2026-0004', status: 'CLOSED', priority: 'LOW', date: '2026-04-30', updated: '5d ago', dept: 'Lab' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-main">Complaints</h1>
          <p className="text-sm text-text-muted mt-1">Manage and track patient feedback</p>
        </div>
        <Button onClick={() => navigate('/complaints/new')} className="flex items-center gap-2">
          <Plus size={18} />
          <span>New complaint</span>
        </Button>
      </div>

      <Card className="p-0 overflow-hidden border-border/60">
        {/* Filter Toolbar */}
        <div className="p-4 border-b border-border bg-surface-2/30 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by reference..." 
              className="w-full bg-surface border border-border-strong rounded-md h-9 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Select 
              className="h-9 py-0 text-xs w-[130px]" 
              options={[
                { label: 'Any Status', value: 'any' },
                { label: 'Open', value: 'open' },
                { label: 'In Progress', value: 'in_progress' },
                { label: 'Resolved', value: 'resolved' },
              ]} 
            />
            <Select 
              className="h-9 py-0 text-xs w-[130px]" 
              options={[
                { label: 'Any Priority', value: 'any' },
                { label: 'Critical', value: 'critical' },
                { label: 'High', value: 'high' },
                { label: 'Normal', value: 'normal' },
                { label: 'Low', value: 'low' },
              ]} 
            />
            <Button variant="secondary" size="sm" className="h-9 h-auto py-0 px-2 text-text-muted">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-surface-2/50 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
              <tr>
                <th className="text-left px-5 py-3 border-b border-border">Reference</th>
                <th className="text-left px-5 py-3 border-b border-border">Status</th>
                <th className="text-left px-5 py-3 border-b border-border">Priority</th>
                <th className="text-left px-5 py-3 border-b border-border">Department</th>
                <th className="text-left px-5 py-3 border-b border-border">Date</th>
                <th className="text-left px-5 py-3 border-b border-border">Updated</th>
                <th className="px-5 py-3 border-b border-border"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {complaints.map((c) => (
                <tr key={c.id} className="hover:bg-surface-hover/50 transition-colors group cursor-pointer" onClick={() => navigate(`/complaints/${c.id}`)}>
                  <td className="px-5 py-4 text-[13px] font-medium text-primary hover:underline">{c.id}</td>
                  <td className="px-5 py-4">
                    <Badge variant={c.status.toLowerCase() as any}>{c.status.replace('_', ' ')}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={c.priority.toLowerCase() === 'critical' ? 'danger' : c.priority.toLowerCase() === 'high' ? 'warn' : 'primary'}>
                      {c.priority}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-[13px] text-text-main">{c.dept}</td>
                  <td className="px-5 py-4 text-[13px] text-text-muted">{c.date}</td>
                  <td className="px-5 py-4 text-[13px] text-text-muted">{c.updated}</td>
                  <td className="px-5 py-4 text-right">
                    <Button variant="ghost" size="sm" className="p-1 h-auto text-text-subtle">
                      <MoreVertical size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border flex items-center justify-between bg-surface-2/10">
          <span className="text-xs text-text-muted">Showing 1 to 4 of 48 entries</span>
          <div className="flex items-center gap-1">
            <Button variant="secondary" size="sm" className="p-1 h-8 w-8 disabled:opacity-30" disabled>
              <ChevronLeft size={16} />
            </Button>
            <Button variant="secondary" size="sm" className="h-8 min-w-[32px] px-0 bg-primary text-white border-primary">1</Button>
            <Button variant="secondary" size="sm" className="h-8 min-w-[32px] px-0">2</Button>
            <Button variant="secondary" size="sm" className="h-8 min-w-[32px] px-0">3</Button>
            <Button variant="secondary" size="sm" className="p-1 h-8 w-8">
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
