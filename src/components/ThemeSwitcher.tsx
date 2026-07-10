"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiSettings } from "react-icons/fi";
import { useTheme, BgTheme } from "./ThemeProvider";

const themes: { id: BgTheme; name: string; colors: string[] }[] = [
  { id: "default", name: "Cyberpunk", colors: ["#8B5CF6", "#EC4899", "#06B6D4"] },
  { id: "oceanic", name: "Oceanic", colors: ["#2563eb", "#06b6d4", "#10b981"] },
  { id: "sunset", name: "Sunset", colors: ["#f43f5e", "#f97316", "#eab308"] },
  { id: "emerald", name: "Emerald", colors: ["#047857", "#10b981", "#a3e635"] },
  { id: "neon", name: "Neon", colors: ["#d946ef", "#8b5cf6", "#f43f5e"] },
];

export default function ThemeSwitcher() {
  const { bgTheme, setBgTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [animatingTheme, setAnimatingTheme] = useState<{ id: BgTheme; name: string; colors: string[] } | null>(null);

  const handleThemeSelect = (t: { id: BgTheme; name: string; colors: string[] }) => {
    setBgTheme(t.id);
    setAnimatingTheme(t);
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => setAnimatingTheme(null), 1000);
    }, 1500); // Wait 1.5s then auto-hide
  };

  return (
    <div className="fixed top-1/2 right-0 -translate-y-1/2 z-[999] flex items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="glass bg-white/80 dark:bg-black/80 p-3 rounded-l-2xl shadow-2xl border border-white/20 mr-2 flex flex-col gap-3"
          >
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeSelect(t)}
                className={`group relative flex items-center w-10 h-10 rounded-full transition-transform hover:scale-110 ${
                  bgTheme === t.id ? "ring-2 ring-white scale-110" : ""
                }`}
                style={{
                  background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1]})`,
                }}
              >
                {/* Tooltip */}
                <span className="absolute right-full mr-3 px-2 py-1 bg-black text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {t.name}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="magnetic-target w-8 h-12 flex items-center justify-center glass bg-white/50 dark:bg-black/50 rounded-l-lg border-y border-l border-white/20 shadow-lg text-slate-800 dark:text-slate-200 hover:text-primary transition-all duration-300 hover:w-10 hover:bg-white/80 dark:hover:bg-black/80"
      >
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.5, type: "spring" }}>
          <FiChevronLeft size={16} className="opacity-70" />
        </motion.div>
      </button>

      {/* Cinematic Wash Animation */}
      <AnimatePresence>
        {animatingTheme && (
          <motion.div
            initial={{ opacity: 0, scale: 0.1, x: "50%", y: "-50%" }}
            animate={{ opacity: 0.15, scale: 3, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 4, x: "-100%", y: "-50%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed top-1/2 right-0 z-[998] pointer-events-none rounded-full"
            style={{
              width: "100vh",
              height: "100vh",
              background: `radial-gradient(circle, ${animatingTheme.colors[0]} 0%, transparent 70%)`,
              mixBlendMode: "screen",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
