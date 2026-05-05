import * as React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Logic will be added once Firebase is confirmed
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden p-6">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-[400px] relative z-10">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-active flex items-center justify-center text-white shadow-lg mb-4 ring-8 ring-primary/5">
            <ShieldCheck size={36} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-text-main">
            Complaint Tracking
            <span className="block text-sm font-medium text-text-muted mt-1">CTS Wordmark System</span>
          </h1>
          <p className="text-text-muted mt-2 text-sm">Sign in to continue to the portal</p>
        </div>

        <Card className="p-8 shadow-xl border-border/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Username" 
              placeholder="e.g. sjohnson" 
              required
              autoComplete="username"
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              required
              autoComplete="current-password"
            />
            
            <Button 
              type="submit" 
              className="w-full h-11" 
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>
        </Card>

        <footer className="mt-8 text-center text-text-subtle text-xs">
          Hadi Clinic · Internal use only
        </footer>
      </div>
    </div>
  );
}
