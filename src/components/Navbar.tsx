"use client";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 100 && latest > (previous || 0)) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 glass shadow-lg' : 'py-5 bg-transparent'}`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-extrabold font-space tracking-tighter">
            Vaishnav<span className="text-primary">.</span>
          </motion.div>
        </Link>

        {/* Center Links (Matched with image) */}
        <div className="hidden lg:flex items-center gap-8 font-inter font-medium text-sm">
          {["Home", "About", "Skills", "Projects", "Certifications", "Contact"].map((item) => (
            <Link key={item} href={item === "Home" ? "#" : item === "Skills" ? "#tech-stack" : `#${item.toLowerCase()}`} className="relative group text-slate-400 hover:text-primary transition-colors">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 0 : 180 }}
              transition={{ duration: 0.5 }}
            >
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </motion.div>
          </button>

          <a href="#contact" className="hidden md:block px-6 py-2.5 bg-gradient-custom text-white font-semibold rounded-full hover:scale-105 transition-transform shadow-[0_5px_15px_rgba(99,102,241,0.3)] hover:shadow-[0_10px_20px_rgba(99,102,241,0.5)] cursor-pointer">
            Let's Innovate
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
