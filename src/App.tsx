import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ComplaintsList from './pages/ComplaintsList';
import ComplaintDetail from './pages/ComplaintDetail';
import NewComplaint from './pages/NewComplaint';
import { AdminShell } from './pages/admin/AdminShell';
import { AppShell } from './components/AppShell';

export default function App() {
  // In a real app, this would be determined by AuthContext
  const isAuthenticated = true; // Temporary mock

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <AppShell>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/complaints" element={<ComplaintsList />} />
                  <Route path="/complaints/new" element={<NewComplaint />} />
                  <Route path="/complaints/:id" element={<ComplaintDetail />} />
                  <Route path="/admin/*" element={<AdminShell />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </AppShell>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
