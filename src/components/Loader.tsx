"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsHidden(true);
            setTimeout(onComplete, 1000); // Fully unmount after fade
          }, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1; // Organic loading speed
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <motion.div 
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: progress === 100 ? 0 : 1, y: progress === 100 ? "-100%" : 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed inset-0 z-[10000] bg-bgDark flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-2xl font-space font-extrabold mb-8 tracking-tighter"
      >
        Vaishnav<span className="text-primary">.</span>
      </motion.div>

      <div className="relative w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-6">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      <div className="flex items-end gap-1">
        <div className="text-5xl font-space font-extrabold text-transparent tracking-tighter" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.8)' }}>
          {progress}
        </div>
        <span className="text-xl font-space font-bold text-slate-500 mb-1">%</span>
      </div>
    </motion.div>
  );
}
