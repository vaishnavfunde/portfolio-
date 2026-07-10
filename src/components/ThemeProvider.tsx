"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
export type BgTheme = "default" | "oceanic" | "sunset" | "emerald" | "neon";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  bgTheme: BgTheme;
  setBgTheme: (t: BgTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [bgTheme, setBgTheme] = useState<BgTheme>("sunset");

  useEffect(() => {
    // Force sunset and dark mode on every page load/refresh
    setTheme("dark");
    setBgTheme("sunset");
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.setAttribute("data-bg-theme", bgTheme);
    
    // Bulletproof CSS Variable Injection for Tailwind v4 compatibility
    const colors = {
      default: { primary: "#8B5CF6", secondary: "#EC4899", accent: "#06B6D4" },
      oceanic: { primary: "#2563eb", secondary: "#06b6d4", accent: "#10b981" },
      sunset: { primary: "#f43f5e", secondary: "#f97316", accent: "#eab308" },
      emerald: { primary: "#047857", secondary: "#10b981", accent: "#a3e635" },
      neon: { primary: "#d946ef", secondary: "#8b5cf6", accent: "#f43f5e" }
    };
    
    const activeColors = colors[bgTheme] || colors.default;
    root.style.setProperty('--theme-primary', activeColors.primary);
    root.style.setProperty('--theme-secondary', activeColors.secondary);
    root.style.setProperty('--theme-accent', activeColors.accent);
    root.style.setProperty('--theme-color-1', activeColors.primary);
    root.style.setProperty('--theme-color-2', activeColors.secondary);
    root.style.setProperty('--theme-color-3', activeColors.accent);
    
    localStorage.setItem("theme", theme);
    localStorage.setItem("bg-theme", bgTheme);
  }, [theme, bgTheme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, bgTheme, setBgTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
