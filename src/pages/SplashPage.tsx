import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../constants/assets';
import { useAuth } from '../hooks/useAuth';

export function SplashPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 50 }); // percentages
  const [isResolved, setIsResolved] = useState(false);

  // Handle drag logic
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isResolved) return;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current || isResolved) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    let newX = ((e.clientX - rect.left) / rect.width) * 100;
    let newY = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Clamp to boundaries
    newX = Math.max(10, Math.min(newX, 90));
    newY = Math.max(10, Math.min(newY, 90));
    
    setPosition({ x: newX, y: newY });
    
    // Check intersection with target (target is around x: 80, y: 50)
    if (newX > 75 && newY > 30 && newY < 70) {
      setIsResolved(true);
      setIsDragging(false);
    }
  };

  // When resolved, we wait a bit and then navigate depending on auth state.
  // We use an effect to ensure we don't navigate while auth is still loading.
  useEffect(() => {
    if (isResolved) {
      const timer = setTimeout(() => {
        if (!loading) {
          if (isAuthenticated) {
            navigate('/inventory', { replace: true });
          } else {
            navigate('/login', { replace: true });
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isResolved, loading, isAuthenticated, navigate]);

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || isResolved) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    
    // Snap back if not resolved
    setPosition({ x: 20, y: 50 });
  };

  return (
    <div className="w-full min-h-[100dvh] bg-[#f5f5f5] flex flex-col items-center justify-between py-10 px-4 relative overflow-hidden max-w-[420px] mx-auto border-x border-gray-200">
      
      {/* Logo */}
      <div className="flex flex-col items-center mt-6 mb-8 z-10">
        <img src={ASSETS.logoFull} alt="Poop Surprise" className="h-28 object-contain" />
      </div>

      {/* Ad Placeholder */}
      <div className="w-full h-[40vh] bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-6 z-10 mt-4">
        <span className="text-gray-300 font-medium text-lg uppercase tracking-widest text-center">
          ESPAÇO<br/>PUBLICITÁRIO
        </span>
      </div>

      {/* Captcha Area */}
      <div className="w-full mt-8 z-10 flex flex-col items-center mb-6">
        <div 
          ref={containerRef}
          className="w-full h-40 bg-[#2a2a2a] rounded-3xl relative flex items-center mb-6 shadow-xl overflow-hidden border-2 border-gray-800"
          style={{ touchAction: 'none' }}
        >
          
          {/* Decorative internal elements to make it look like a maze/area */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}></div>

          {/* Target Circle (Right) */}
          <div 
            ref={targetRef}
            className={`absolute w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-inner transition-colors duration-300 ${isResolved ? 'bg-green-500 border-green-400' : 'bg-[#1a1a1a] border-gray-700'}`}
            style={{ left: '75%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
             {isResolved && <span className="text-white text-2xl">✓</span>}
          </div>

          {/* Draggable Poop */}
          <div 
            className={`absolute w-16 h-16 transition-transform ${isDragging ? 'scale-110' : 'scale-100'}`}
            style={{ 
              left: `${position.x}%`, 
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)',
              transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              cursor: 'grab',
              touchAction: 'none',
              zIndex: 30
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <img src={ASSETS.poop3} alt="Drag me" className="w-full h-full object-contain drop-shadow-md pointer-events-none" />
          </div>
        </div>

        {/* Instructions */}
        <div className="flex items-center justify-center gap-4 w-full px-4">
          <img src={ASSETS.deliveryScooter} alt="Scooter" className="w-12 h-12 object-contain -scale-x-100 drop-shadow-sm" />
          <div>
            <p className="text-gray-800 font-medium text-lg leading-tight">
              Arraste o poop até ao buraco
            </p>
            <p className="text-[#4A72D6] font-bold text-lg">
              Para entrar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
