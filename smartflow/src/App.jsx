import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import BuilderPage from './pages/BuilderPage';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/builder/:id" element={<BuilderPage />} />
          {/* other routes */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
