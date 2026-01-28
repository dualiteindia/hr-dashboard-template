import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Recruitment } from './pages/Recruitment';
import { Payroll } from './pages/Payroll';
import { DayOffRequests } from './pages/DayOffRequests';
import { TimeTracker } from './pages/TimeTracker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="recruitment" element={<Recruitment />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="requests" element={<DayOffRequests />} />
          <Route path="tracker" element={<TimeTracker />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
