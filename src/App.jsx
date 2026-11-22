import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TournamentProvider } from './context/TournamentContext';
import DashboardView from './components/DashboardView';
import AdminView from './components/AdminView';

export default function App() {
  return (
    <TournamentProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Tournament Bracket Dashboard View (Clean, matching screenshot) */}
          <Route path="/" element={<DashboardView />} />

          {/* Admin Control Panel to manage contestants, pick winners, and auto-advance */}
          <Route path="/admin" element={<AdminView />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TournamentProvider>
  );
}
