import * as React from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  ShieldCheck, 
  LogOut, 
  Key,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { Button } from './ui/Button';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Complaints', href: '/complaints', icon: ClipboardList },
  { label: 'Admin', href: '/admin', icon: ShieldCheck, adminOnly: true },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();

  // In a real app, this would come from AuthContext
  const user = {
    displayName: 'Sarah Johnson',
    username: 'sjohnson',
    role: 'ADMIN',
    department: 'Reception'
  };

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar text-sidebar-text flex-col flex transition-all duration-300 z-40 transform lg:translate-x-0 lg:static fixed inset-y-0 left-0",
          isSidebarOpen ? "w-[240px]" : "w-0 lg:w-[64px] -translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Block */}
        <div className="p-6 flex flex-col gap-1 shrink-0 border-b border-sidebar-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-accent/10 flex items-center justify-center rounded-lg">
              <ShieldCheck className="text-sidebar-accent" size={24} />
            </div>
            {isSidebarOpen && (
              <div>
                <h1 className="text-xl font-bold leading-none tracking-tight text-white">CTS</h1>
                <p className="text-[10px] uppercase tracking-widest text-[#94a3b8] font-semibold mt-1">Complaint Tracking</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 mt-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors group",
                  isActive 
                    ? "bg-sidebar-2 text-sidebar-accent font-medium" 
                    : "text-sidebar-text-muted hover:bg-sidebar-2 hover:text-white"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-sidebar-accent" : "text-sidebar-text-muted group-hover:text-white")} />
                {isSidebarOpen && <span className="text-[14px]">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* User Block */}
        <div className="p-4 bg-[#0a0f1a] border-t border-sidebar-2">
          <div className={cn("flex items-center gap-3", isSidebarOpen ? "" : "justify-center")}>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0">
              {user.displayName.split(' ').map(n => n[0]).join('')}
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate text-white leading-none mb-1">{user.displayName}</p>
                <p className="text-[11px] text-sidebar-text-muted truncate">@{user.username} · {user.role}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-border px-8 flex items-center justify-between shrink-0 relative z-30">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden p-1 h-auto"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu size={20} />
            </Button>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full bg-primary-bg text-primary text-[10px] font-bold uppercase tracking-wider">Operational</span>
              <span className="text-text-subtle text-sm hidden sm:block">Hadi Clinic CMS v2.4.1</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm text-text-muted hover:text-text-main transition-colors">
              <Key size={16} />
              <span>Change password</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 border border-border rounded-md text-sm font-medium hover:bg-bg transition-colors shadow-sm">
              <LogOut size={16} className="text-danger" />
              <span>Sign out</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="mt-auto border-t border-border py-4 px-8 flex justify-between bg-surface">
          <p className="text-[11px] text-text-subtle font-medium">Hadi Clinic · Internal use only · Access Logged</p>
          <div className="flex gap-4">
            <span className="text-[11px] text-primary font-semibold cursor-pointer">Support Center</span>
            <span className="text-[11px] text-primary font-semibold cursor-pointer">API Status</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
