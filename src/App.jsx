import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TournamentProvider } from './context/TournamentContext';
import DashboardView from './components/DashboardView';
import AdminView from './components/AdminView';
import AdminLogin from './components/AdminLogin';

function ProtectedAdminRoute() {
  const [isAuth, setIsAuth] = useState(
    () => localStorage.getItem('tournament_admin_auth') === 'true'
  );

  if (!isAuth) {
    return <AdminLogin onLoginSuccess={() => setIsAuth(true)} />;
  }

  return (
    <AdminView
      onLogout={() => {
        localStorage.removeItem('tournament_admin_auth');
        localStorage.removeItem('tournament_admin_user');
        setIsAuth(false);
      }}
    />
  );
}

export default function App() {
  return (
    <TournamentProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Tournament Bracket Dashboard View */}
          <Route path="/" element={<DashboardView />} />

          {/* Admin Control Panel — protected by login */}
          <Route path="/admin" element={<ProtectedAdminRoute />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TournamentProvider>
  );
}
