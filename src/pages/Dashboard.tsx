import * as React from 'react';
import { cn } from '@/src/lib/utils';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  Users, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

const STATUS_COLORS = {
  OPEN: 'var(--primary)',
  IN_PROGRESS: 'var(--warn)',
  RESOLVED: 'var(--success)',
  CLOSED: 'var(--text-muted)',
  REJECTED: 'var(--danger)'
};

const PRIORITY_COLORS = {
  LOW: '#94a3b8',
  NORMAL: 'var(--primary)',
  HIGH: 'var(--warn)',
  CRITICAL: 'var(--danger)'
};

export default function Dashboard() {
  // Sample data for charts
  const trendData = [
    { name: 'Mon', count: 12 },
    { name: 'Tue', count: 18 },
    { name: 'Wed', count: 15 },
    { name: 'Thu', count: 25 },
    { name: 'Fri', count: 20 },
    { name: 'Sat', count: 8 },
    { name: 'Sun', count: 5 },
  ];

  const statusData = [
    { name: 'Open', value: 35, color: STATUS_COLORS.OPEN },
    { name: 'In Progress', value: 20, color: STATUS_COLORS.IN_PROGRESS },
    { name: 'Resolved', value: 30, color: STATUS_COLORS.RESOLVED },
    { name: 'Closed', value: 10, color: STATUS_COLORS.CLOSED },
    { name: 'Rejected', value: 5, color: STATUS_COLORS.REJECTED },
  ];

  const departmentData = [
    { name: 'Reception', count: 25 },
    { name: 'Pharmacy', count: 15 },
    { name: 'Nursing', count: 20 },
    { name: 'Lab', count: 10 },
    { name: 'Kitchen', count: 5 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-text-main">Manager Dashboard</h2>
        <p className="text-text-muted text-sm">System-wide overview for Jan 1 — Jan 24, 2024</p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Total Cases" 
          value="1,284" 
          trend="+12%"
        />
        <KPICard 
          title="Currently Open" 
          value="42" 
          caption="Action required"
          emphasis
          color="primary"
        />
        <KPICard 
          title="Critical Cases" 
          value="08" 
          trend="Prio 1"
          emphasis
          color="warn"
        />
        <KPICard 
          title="Avg Close Time" 
          value="4.2d" 
          caption="Last 90d"
        />
      </div>

      {/* Trend Chart */}
      <Card title="Complaint Trend" headerAction={
        <Badge variant="primary">Last 7 Days</Badge>
      }>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="count" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Grid for distributions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-border rounded-[10px] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-text-main">Open Complaint Aging</h3>
            <div className="px-2 py-1 bg-bg border border-border rounded text-[10px] font-bold text-text-muted">REAL-TIME</div>
          </div>
          <div className="flex items-end gap-3 h-32 mt-4 px-2">
            {[
              { label: '0–1d', value: '80%', color: '#10b981' },
              { label: '1–7d', value: '45%', color: '#f59e0b' },
              { label: '7–30d', value: '25%', color: '#ef4444' },
              { label: '30d+', value: '10%', color: '#7f1d1d' },
            ].map((bar) => (
              <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full rounded-t-sm transition-all duration-700" 
                  style={{ height: bar.value, backgroundColor: bar.color }} 
                />
                <span className="text-[10px] text-text-muted font-medium whitespace-nowrap">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white border border-border rounded-[10px] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-text-main">By Department</h3>
            <button className="text-xs font-semibold text-primary uppercase">View Details</button>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { name: 'Pharmacy', value: '35%', color: '#2563eb' },
              { name: 'Reception', value: '28%', color: '#3b82f6' },
              { name: 'Nursing', value: '15%', color: '#60a5fa' },
              { name: 'Laboratory', value: '12%', color: '#93c5fd' },
            ].map((dept) => (
              <div key={dept.name}>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>{dept.name}</span>
                  <span>{dept.value}</span>
                </div>
                <div className="w-full bg-bg-accent h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: dept.value, backgroundColor: dept.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, trend, emphasis, color, caption }: any) {
  const borderColorClass = emphasis ? (color === 'warn' ? 'border-l-[#f59e0b]' : 'border-l-[#2563eb]') : 'border-[#e2e8f0]';
  const textColorClass = emphasis ? (color === 'warn' ? 'text-[#f59e0b]' : 'text-[#2563eb]') : 'text-[#0f172a]';
  
  return (
    <div className={cn(
      "p-5 bg-white border rounded-[10px] shadow-sm",
      emphasis ? `border-l-4 ${borderColorClass}` : "border-[#e2e8f0]"
    )}>
      <p className={cn(
        "text-xs font-semibold uppercase tracking-wider mb-1",
        emphasis ? textColorClass : "text-[#64748b]"
      )}>{title}</p>
      <div className="flex items-baseline gap-2">
        <span className={cn("text-3xl font-bold", emphasis ? textColorClass : "text-[#0f172a]")}>{value}</span>
        {trend && (
          <span className={cn(
            "text-xs font-medium",
            trend.startsWith('+') ? "text-[#10b981]" : "text-[#64748b]"
          )}>{trend}</span>
        )}
        {caption && <span className="text-xs text-[#64748b] font-normal">{caption}</span>}
      </div>
    </div>
  );
}
