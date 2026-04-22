import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
      
      {/* UI Navigation Tool for Dev - To quickly switch views */}
      <div className="fixed top-2 right-2 bg-black/80 text-white p-2 rounded-lg text-xs z-[9999] flex flex-col gap-2 shadow-xl border border-white/20 backdrop-blur-md">
        <h3 className="font-bold text-gray-400 mb-1 border-b border-white/10 pb-1">DEV MENU</h3>
        <a href="/login" className="hover:text-[#0A84FF] transition-colors flex items-center gap-2"><span>1️⃣</span> Login</a>
        <a href="/inventory" className="hover:text-[#0A84FF] transition-colors flex items-center gap-2"><span>2️⃣</span> Inventário</a>
      </div>
    </BrowserRouter>
  );
}
