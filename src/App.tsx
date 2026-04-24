import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CompleteProfilePage } from './pages/CompleteProfilePage';
import { InventoryPage } from './pages/InventoryPage';
import { AuthGuard, GuestGuard } from './components/guards/AuthGuard';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth routes — redirect to /inventory if already logged in */}
        <Route path="/login" element={
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        } />
        <Route path="/register" element={
          <GuestGuard>
            <RegisterPage />
          </GuestGuard>
        } />
        
        {/* Complete Profile — requires auth but not full profile yet */}
        <Route path="/complete-profile" element={
          <AuthGuard>
            <CompleteProfilePage />
          </AuthGuard>
        } />
        
        {/* Game routes — require auth */}
        <Route path="/inventory" element={
          <AuthGuard>
            <InventoryPage />
          </AuthGuard>
        } />
      </Routes>
      
      {/* DEV MENU — quick navigation (remove in production) */}
      <div className="fixed top-2 right-2 bg-black/80 text-white p-2 rounded-lg text-xs z-[9999] flex flex-col gap-2 shadow-xl border border-white/20 backdrop-blur-md">
        <h3 className="font-bold text-gray-400 mb-1 border-b border-white/10 pb-1">DEV MENU</h3>
        <a href="/login" className="hover:text-[#4A6CF7] transition-colors flex items-center gap-2"><span>1️⃣</span> Login</a>
        <a href="/register" className="hover:text-[#4A6CF7] transition-colors flex items-center gap-2"><span>2️⃣</span> Registo</a>
        <a href="/complete-profile" className="hover:text-[#4A6CF7] transition-colors flex items-center gap-2"><span>3️⃣</span> Perfil</a>
        <a href="/inventory" className="hover:text-[#4A6CF7] transition-colors flex items-center gap-2"><span>4️⃣</span> Inventário</a>
      </div>
    </BrowserRouter>
  );
}
