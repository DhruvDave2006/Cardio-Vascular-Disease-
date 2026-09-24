import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import ResultPage from './pages/ResultPage';
import InsightsPage from './pages/InsightsPage';
import ModelInfoPage from './pages/ModelInfoPage';
import DisclaimerPage from './pages/DisclaimerPage';

import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/model" element={<ModelInfoPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
