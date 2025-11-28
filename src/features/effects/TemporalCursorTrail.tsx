import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorPoint {
  id: number;
  x: number;
  y: number;
}

export function TemporalCursorTrail() {
  const [points, setPoints] = useState<CursorPoint[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    // Detect touch device
    setIsTouchDevice('ontouchstart' in window);
    
    if ('ontouchstart' in window) return; // Skip on touch devices
    
    let pointId = 0;
    const maxPoints = 8;
    
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: CursorPoint = {
        id: pointId++,
        x: e.clientX,
        y: e.clientY,
      };
      
      setPoints((prev) => {
        const updated = [newPoint, ...prev];
        return updated.slice(0, maxPoints);
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  if (isTouchDevice) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {points.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute w-2 h-2 rounded-full bg-accent-future"
            style={{
              left: point.x - 4,
              top: point.y - 4,
              boxShadow: '0 0 8px rgba(96, 165, 250, 0.6)',
              opacity: 0.6 - index * 0.08,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
