"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence, animate } from "framer-motion";
import { FiDownload, FiGithub, FiLinkedin, FiInstagram, FiExternalLink, FiBriefcase, FiAward, FiBook, FiMonitor, FiCheck, FiServer, FiTool, FiCpu, FiClock, FiSend, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";
import Loader from "../components/Loader";
import Image from "next/image";
const typingTitles = [
  "Flutter Developer",
  "UI/UX Enthusiast",
  "AI Integrator",
  "Tech Explorer"
];

const CERTIFICATIONS = [
  {
    title: "Google Student Ambassador Finalist",
    description: "Selected as a Google Student Ambassador Finalist (2026-27) for demonstrating technical excellence, leadership potential, community engagement, and a passion for innovation.",
    skills: ["Leadership", "Community Building", "Technical Communication", "Innovation"],
    isTop: true,
  },
  {
    title: "Industrial AI & Machine Learning",
    description: "Completed industry-focused training in Artificial Intelligence and Machine Learning, gaining hands-on experience with AI workflows, machine learning concepts, and real-world applications.",
    skills: ["Artificial Intelligence", "Machine Learning", "Automation", "AI Workflows"],
  },
  {
    title: "Cryptography & Cybersecurity",
    description: "Built a strong foundation in cybersecurity, cryptographic principles, secure communication, and modern data protection techniques.",
    skills: ["Cybersecurity", "Cryptography", "Encryption", "Data Protection"],
  },
  {
    title: "Entrepreneurship Awareness Program",
    description: "Successfully completed a Government-certified entrepreneurship program focused on innovation, startup fundamentals, and business development.",
    skills: ["Entrepreneurship", "Innovation", "Startup Ecosystem", "Business Strategy"],
  },
  {
    title: "National IP Awareness Mission",
    description: "Recognized by the Government of India for successfully completing the National Intellectual Property Awareness Mission and understanding Intellectual Property Rights (IPR).",
    skills: ["Intellectual Property", "Patent Awareness", "Copyright", "Innovation Ethics"],
  },
  {
    title: "MS-CIT",
    description: "Certified in computer fundamentals, digital productivity, office applications, and internet technologies.",
    skills: ["Computer Fundamentals", "Digital Literacy", "Office Productivity"],
  },
  {
    title: "Project Completion Certification",
    description: "Recognized for successfully completing project-based software development with a focus on practical implementation, collaboration, and engineering best practices.",
    skills: ["Software Development", "Team Collaboration", "Project Management"],
  },
];

function CertificationsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextCert = () => setCurrentIndex((prev) => (prev + 1) % CERTIFICATIONS.length);
  const prevCert = () => setCurrentIndex((prev) => (prev - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length);

  const getOffset = (index: number) => {
    let diff = index - currentIndex;
    const len = CERTIFICATIONS.length;
    if (diff > Math.floor(len / 2)) diff -= len;
    if (diff < -Math.floor(len / 2)) diff += len;
    return diff;
  };

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center [perspective:1200px]">
      {CERTIFICATIONS.map((cert, index) => {
        const offset = getOffset(index);
        const isCenter = offset === 0;
        
        let opacity = 0;
        if (isCenter) opacity = 1;
        else if (Math.abs(offset) === 1) opacity = 0.15;

        let scale = 0.8;
        if (isCenter) scale = 1;
        else if (Math.abs(offset) > 1) scale = 0.6; 

        return (
          <motion.div
            key={index}
            initial={false}
            animate={{
              opacity,
              scale,
              x: offset * 500, // Increased spacing to completely prevent overlap
              y: isCenter ? 0 : 30,
              rotateY: offset * -25,
              rotateZ: offset * 4,
              zIndex: 30 - Math.abs(offset) * 10,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 22 }}
            className={`absolute glass bg-white/90 dark:bg-black/90 rounded-[2.5rem] p-8 md:p-10 border border-black/10 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] w-full max-w-lg transition-colors duration-500 ${isCenter ? 'cursor-grab active:cursor-grabbing hover:border-accent/50' : 'cursor-pointer'}`}
            drag={isCenter ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset: dragOffset, velocity }) => {
              // Standard swipe direction (moves right-to-left)
              if (dragOffset.x > 50) prevCert();
              else if (dragOffset.x < -50) nextCert();
            }}
            onClick={() => {
              if (offset === -1) prevCert();
              if (offset === 1) nextCert();
            }}
            style={{
              pointerEvents: Math.abs(offset) > 1 ? "none" : "auto"
            }}
          >
            {cert.isTop && (
              <div className="absolute -top-6 -right-6 w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center text-white text-2xl shadow-[0_0_20px_rgba(234,179,8,0.5)] rotate-12">
                ⭐
              </div>
            )}
            
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg">
                <FiAward size={28} className="text-white" />
              </div>
              <h4 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                {cert.title}
              </h4>
            </div>
            
            <p className="text-base text-slate-600 dark:text-slate-400 font-inter mb-8 leading-relaxed line-clamp-4">
              {cert.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-40">
        {CERTIFICATIONS.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-accent w-8' : 'bg-slate-300 dark:bg-slate-700'}`}
          />
        ))}
      </div>
    </div>
  );
}


const PROJECTS = [
  {
    id: 1,
    title: "RankSetu",
    category: "AI-Powered Competitive Exam Platform",
    description: "An intelligent competitive exam preparation platform designed to replace traditional learning methods with adaptive, AI-driven experiences. It combines mock tests, OCR-based question scanning, and real-time analytics into a single ecosystem.",
    tech: ["Flutter", "Firebase", "Cloud Firestore", "Firebase Auth", "Firebase Storage", "FCM", "OCR", "REST APIs", "AI Integration"],
    link: "#",
    color: "from-primary/20 to-primary/5",
    accent: "text-primary",
    image: "/projects/ranksetu.png"
  },
  {
    id: 2,
    title: "Academiq",
    category: "Smart Education Management Platform",
    description: "A comprehensive education management system designed for colleges. It centralizes attendance, announcements, assignments, authentication, and role-based access into a unified mobile platform using Face Recognition and Geolocation.",
    tech: ["Flutter", "Firebase", "Cloud Firestore", "Face API", "Geolocation", "Firebase Auth", "REST APIs"],
    link: "#",
    color: "from-secondary/20 to-secondary/5",
    accent: "text-secondary",
    image: "/projects/academiq.png"
  },
  {
    id: 3,
    title: "AI Dost",
    category: "Offline AI Chat Assistant",
    description: "An offline-first intelligent chatbot that delivers AI-powered assistance without relying on continuous internet connectivity. It focuses on fast local responses, privacy, and efficient knowledge retrieval.",
    tech: ["Flutter", "SQLite", "NLP", "Offline AI Frameworks"],
    link: "#",
    color: "from-accent/20 to-accent/5",
    accent: "text-accent",
    image: "/projects/aidost.png"
  },
  {
    id: 4,
    title: "Experience Tracker",
    category: "Personal Productivity & Career Management",
    description: "A productivity application that helps users organize internships, certifications, achievements, projects, and career milestones with analytics and structured records.",
    tech: ["Flutter", "Firebase", "Chart.js", "Local Storage"],
    link: "#",
    color: "from-success/20 to-success/5",
    accent: "text-success",
    image: "/projects/expensetracker.png"
  }
];

// Staggered Text Animation Component
const StaggeredText = ({ text }: { text: string }) => {
  return (
    <span className="inline-block overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: [0.33, 1, 0.68, 1] }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

// Animated Number Counter Component
const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) ref.current.textContent = Math.round(v) + suffix;
        },
      });
      return controls.stop;
    }
  }, [isInView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

// Letter by Letter Typing & Wiping Animation
const TypingRole = ({ text }: { text: string }) => {
  return (
    <motion.div
      key={text}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
        exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
      }}
      className="absolute text-xl sm:text-2xl md:text-3xl lg:text-[3rem] font-extrabold tracking-tight text-slate-700 dark:text-slate-200"
    >
      {(text || "").split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 10 },
            visible: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.8, y: -10 }
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div ref={ref} className="relative overflow-hidden w-full">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75, scale: 0.95 },
          visible: { opacity: 1, y: 0, scale: 1 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.7, delay, type: "spring", bounce: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    
    // Array of Access Keys for fallback limit protection
    const ACCESS_KEYS = [
      "35c0e753-d590-498d-a95d-aa16289de454",
      "562888d8-6749-4b98-b2e3-5adf7432e551",
      "YOUR_THIRD_ACCESS_KEY_HERE"
    ];

    let success = false;

    for (const key of ACCESS_KEYS) {
      if (!key || key.includes("YOUR_")) continue; // Skip unfilled placeholders
      
      object.access_key = key;
      const json = JSON.stringify(object);
      
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: json
        });
        
        let data;
        try {
          data = await response.json();
        } catch (err) {
          data = {};
        }
        
        if (response.ok || (data && data.success)) {
          success = true;
          break; // Stop trying if email is sent successfully
        }
      } catch (error) {
        console.error("Form submission error with key:", key, error);
        // Automatically continues to the next key in the array
      }
    }

    if (success) {
      setFormStatus("success");
      form.reset();
      setTimeout(() => setFormStatus("idle"), 4000);
    } else {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };


  const educationRef = useRef(null);
  // --- Scroll Animations (Wipe Out Effect) ---
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -100]);
  const imageOpacity = useTransform(scrollY, [0, 500], [0.9, 0]);
  const imageX = useTransform(scrollY, [0, 500], [0, 100]);

  const { scrollYProgress: eduScroll } = useScroll({
    target: educationRef,
    offset: ["start center", "end center"]
  });
  const eduLineHeight = useTransform(eduScroll, [0, 1], ["0%", "100%"]);


  useEffect(() => {
    if (!isLoaded) return;
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % typingTitles.length);
    }, 4000); // Slower, more premium transition
    return () => clearInterval(interval);
  }, [isLoaded]);

  return (
    <>
      {/* Cinematic Loader */}
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

      <main className="min-h-screen relative overflow-hidden font-poppins selection:bg-primary/30">

        {/* 1. 3-LAYER SUPREME HERO SECTION */}
        <section id="hero" className="relative h-screen w-full flex items-center overflow-hidden snap-start snap-always">

          {/* LAYER 1: Dynamic Color Theme Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Pink/Purple Blob */}
            <motion.div
              className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-secondary/30 blur-[150px] dark:bg-secondary/30"
              animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Cyan Blob */}
            <motion.div
              className="absolute top-[30%] right-[0%] w-[60vw] h-[60vw] rounded-full bg-accent/30 blur-[150px] dark:bg-accent/30"
              animate={{ x: [0, -60, 0], y: [0, 50, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            {/* Purple Blob Center */}
            <motion.div
              className="absolute top-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-primary/20 blur-[180px] dark:bg-primary/20"
              animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
          </div>

          {/* LAYER 2: Full Screen Transparent Image */}
          <motion.div
            initial={{ opacity: 0, x: 150, scale: 1.05 }}
            animate={isLoaded ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ opacity: imageOpacity, x: imageX }}
            className="absolute inset-0 z-10 pointer-events-none flex justify-end items-end"
          >
            {/* Image anchored right/bottom for mobile & desktop to prevent text overlap */}
            <img
              src="/bg.png"
              alt="Vaishnav Funde"
              className="w-full h-full object-contain object-right-bottom md:object-right-bottom drop-shadow-[0_0_50px_rgba(236,72,153,0.3)] mix-blend-normal opacity-80 md:opacity-100"
            />
          </motion.div>

          {/* LAYER 3: Details on the LEFT Side without Glassmorphism */}
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="absolute inset-0 z-20 flex justify-start items-center pointer-events-none"
          >
            <div className="container mx-auto px-6 md:px-12 flex justify-start h-full items-center">
              <div className="w-full md:w-[60%] lg:w-[55%] flex flex-col gap-5 pt-20 pointer-events-auto">

                {/* Name & Titles */}
                <div className="overflow-hidden">
                  {isLoaded && (
                    <>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-space text-primary font-semibold tracking-widest uppercase mb-2">
                        Hello, I'm
                      </h3>
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.1] mb-2 flex flex-wrap items-center">
                        <span className="text-gradient inline-block drop-shadow-md">
                          <StaggeredText text="Vaishnav Funde" />
                        </span>
                      </h1>
                    </>
                  )}
                  <div className="h-[40px] sm:h-[50px] md:h-[60px] lg:h-[70px] overflow-hidden relative mt-1">
                    <AnimatePresence mode="wait">
                      {isLoaded && <TypingRole key={titleIndex} text={typingTitles[titleIndex] || typingTitles[0]} />}
                    </AnimatePresence>
                  </div>
                </div>

                <motion.p
                  initial={{ opacity: 0, x: -20 }} animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 1, delay: 0.8 }}
                  className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 font-inter font-medium leading-relaxed max-w-lg border-l-4 border-primary pl-4"
                >
                  A Flutter Developer passionate about building clean, user-focused mobile applications with Firebase and AI integrations. I love exploring new technologies, improving my engineering skills, and creating solutions that make everyday tasks simpler.
                </motion.p>

                {/* Hero Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 1, delay: 0.9 }}
                  className="flex flex-wrap items-center gap-3 md:gap-4 mt-4 mb-2 w-fit"
                >
                  <motion.a href="#projects" whileHover={{ scale: 1.1, y: -2 }} className="flex flex-col items-center justify-center px-2 py-1 transition-transform cursor-pointer group">
                    <span className="text-lg md:text-xl font-black text-primary flex items-center">
                      <AnimatedCounter value={10} suffix="+" />
                    </span>
                    <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Projects</span>
                  </motion.a>
                  <div className="w-px h-5 bg-black/10 dark:bg-white/10 hidden sm:block"></div>
                  
                  <motion.a href="#tech-stack" whileHover={{ scale: 1.1, y: -2 }} className="flex flex-col items-center justify-center px-2 py-1 transition-transform cursor-pointer group">
                    <span className="text-lg md:text-xl font-black text-secondary flex items-center">
                      <AnimatedCounter value={20} suffix="+" />
                    </span>
                    <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Tech</span>
                  </motion.a>
                  <div className="w-px h-5 bg-black/10 dark:bg-white/10 hidden sm:block"></div>
                  
                  <motion.a href="#tech-stack" whileHover={{ scale: 1.1, y: -2 }} className="flex flex-col items-center justify-center px-2 py-1 transition-transform cursor-pointer group">
                    <span className="text-lg md:text-xl font-black text-accent flex items-center">
                      <AnimatedCounter value={8} suffix="+" />
                    </span>
                    <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">AI Tools</span>
                  </motion.a>
                  <div className="w-px h-5 bg-black/10 dark:bg-white/10 hidden sm:block"></div>
                  
                  <motion.a href="#about" whileHover={{ scale: 1.1, y: -2 }} className="flex flex-col items-center justify-center px-2 py-1 transition-transform cursor-pointer group">
                    <span className="text-lg md:text-xl font-black text-success flex items-center">
                      <AnimatedCounter value={1} suffix="" />
                    </span>
                    <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Internship</span>
                  </motion.a>
                </motion.div>

                {/* Horizontal Social Icons (Small Size) */}
                <motion.div
                  initial={{ opacity: 0 }} animate={isLoaded ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1, delay: 1 }}
                  className="flex items-center gap-4 mt-2"
                >
                  {[
                    { icon: <FiMail size={20} />, link: "mailto:vaishnavfunde1112@gmail.com", hoverClass: "hover:text-red-500" },
                    { icon: <FiGithub size={20} />, link: "https://github.com/vaishnavfunde", hoverClass: "hover:text-slate-900 dark:hover:text-white" },
                    { icon: <FiLinkedin size={20} />, link: "https://www.linkedin.com/in/vaishnav-funde1112/", hoverClass: "hover:text-blue-600 dark:hover:text-blue-400" },
                    { icon: <FiInstagram size={20} />, link: "https://www.instagram.com/vaishnav_funde/", hoverClass: "hover:text-pink-600 dark:hover:text-pink-400" }
                  ].map((social, i) => (
                    <motion.a
                      key={i} href={social.link} target="_blank" rel="noreferrer"
                      className={`magnetic-target text-slate-500 dark:text-slate-400 transition-colors p-2 bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 shadow-sm border border-black/5 dark:border-white/5 ${social.hoverClass}`}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>

                {/* Download Button (Small & Perfect Alignment) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 1, delay: 1.2 }}
                  className="flex flex-wrap items-center gap-4 mt-2"
                >
                  <a href="/resume.pdf" download className="magnetic-target px-6 py-2.5 bg-gradient-custom text-white font-bold rounded-full hover:scale-105 transition-transform shadow-[0_5px_20px_rgba(236,72,153,0.3)] hover:shadow-[0_10px_30px_rgba(236,72,153,0.5)] flex items-center gap-2 text-sm">
                    <FiDownload size={16} />
                    Download Resume
                  </a>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. ABOUT & SKILLS */}
        <section id="about" className="pt-24 pb-8 relative z-20 snap-start snap-always min-h-screen flex flex-col justify-center">

          {/* Free-form Container */}
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 py-8 overflow-visible">

            {/* Title */}
            <div className="mb-12 flex items-center gap-4">
              <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                About <span className="text-primary">Me</span>
              </h2>
              <div className="h-1 flex-grow max-w-[200px] bg-gradient-to-r from-primary to-transparent rounded-full hidden sm:block"></div>
            </div>

            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">

                {/* Main Bio Card */}
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.5, damping: 20 }}
                  whileHover={{ scale: 1.02, y: -10, boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.4)" }}
                  className="lg:col-span-2 glass bg-white/60 dark:bg-black/60 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group border border-black/5 dark:border-white/10 hover:border-primary/50 transition-all duration-500 shadow-2xl"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full group-hover:bg-primary/40 transition-colors duration-700 pointer-events-none"></div>
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                    <FiAward className="text-primary" />
                    <StaggeredText text="The Visionary" />
                  </h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} viewport={{ once: false, margin: "-50px" }}
                    className="text-lg text-slate-700 dark:text-slate-300 font-inter leading-relaxed mb-8 max-w-2xl relative z-10"
                  >
                    I enjoy turning ideas into intuitive mobile applications that solve real-world problems. My primary focus is Flutter and Firebase, where I build responsive user experiences, integrate cloud services, and experiment with AI-powered features like OCR and intelligent workflows. I'm continuously learning new technologies while strengthening my foundations in software development, networking, and modern web technologies.
                  </motion.p>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)" }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="inline-flex items-center gap-4 bg-white/50 dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-colors cursor-pointer relative z-10 shadow-lg"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full text-primary">
                      <FiAward size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Achievement</p>
                      <p className="font-extrabold text-slate-800 dark:text-slate-50">Google Student Ambassador Finalist 26-27</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Philosophy / Quote Card */}
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.1, type: "spring", bounce: 0.5, damping: 20 }}
                  whileHover={{ scale: 1.02, y: -5, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.4)" }}
                  className="lg:col-span-1 glass bg-white/60 dark:bg-black/60 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group border border-black/5 dark:border-white/10 hover:border-primary/50 transition-all duration-500 shadow-2xl flex items-center justify-center text-center"
                >
                  <FiBook className="absolute top-6 right-6 text-primary opacity-10 group-hover:scale-125 transition-transform duration-700" size={80} />
                  <p className="text-xl md:text-2xl font-space font-medium italic text-slate-800 dark:text-slate-200 relative z-10 leading-relaxed">
                    "I believe great software isn't just about writing code. It's about solving problems with simplicity, thoughtful design, and continuous learning."
                  </p>
                </motion.div>

                {/* Tech Stack Card (The Arsenal - Redesigned with Animated Chips) */}
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.1, type: "spring", bounce: 0.5, damping: 20 }}
                  className="lg:col-span-3 glass bg-white/60 dark:bg-black/60 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group border border-black/5 dark:border-white/10 transition-all duration-500 shadow-2xl"
                >
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-secondary/5 to-transparent blur-[60px] pointer-events-none"></div>
                  <div className="mb-10 relative z-10">
                    <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
                      <FiMonitor className="text-secondary" />
                      <StaggeredText text="The Arsenal" />
                    </h3>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }}
                      className="mt-3 text-slate-600 dark:text-slate-400 font-medium tracking-wide italic border-l-2 border-primary pl-3 bg-gradient-to-r from-primary/5 to-transparent py-1"
                    >
                      From imagination to innovation.
                    </motion.p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 relative z-10">

                    {/* ⚔️ Core Expertise */}
                    <div>
                      <h4 className="text-lg font-bold flex items-center gap-2 mb-6 text-slate-800 dark:text-slate-100 border-b border-black/5 dark:border-white/10 pb-3">
                        ⚔️ Core Expertise
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {[
                          "Flutter", "Dart", "Firebase", "Cloud Firestore", "Firebase Auth",
                          "Firebase Storage", "FCM", "REST APIs", "Responsive UI", "Material Design"
                        ].map((skill, i) => (
                          <motion.li
                            key={skill}
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 25 }}
                            whileHover={{ x: 8 }}
                            className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors cursor-pointer flex items-center gap-3 group/item"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-primary group-hover/item:shadow-[0_0_8px_var(--theme-primary)] transition-all duration-300"></span>
                            {skill}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* 🛠 Development Tools */}
                    <div>
                      <h4 className="text-lg font-bold flex items-center gap-2 mb-6 text-slate-800 dark:text-slate-100 border-b border-black/5 dark:border-white/10 pb-3">
                        🛠 Dev Tools
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {[
                          "Android Studio", "VS Code", "Git", "GitHub", "Postman", "Figma", "Firebase Console"
                        ].map((skill, i) => (
                          <motion.li
                            key={skill}
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.1 + (i * 0.08), type: "spring", stiffness: 300, damping: 25 }}
                            whileHover={{ x: 8 }}
                            className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors cursor-pointer flex items-center gap-3 group/item"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-secondary group-hover/item:shadow-[0_0_8px_var(--theme-secondary)] transition-all duration-300"></span>
                            {skill}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* 🤖 AI Arsenal */}
                    <div>
                      <h4 className="text-lg font-bold flex items-center gap-2 mb-6 text-slate-800 dark:text-slate-100 border-b border-black/5 dark:border-white/10 pb-3">
                        🤖 AI Arsenal
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {[
                          "ChatGPT", "Claude", "Gemini", "Cursor AI", "GitHub Copilot",
                          "Prompt Engineering", "AI Assisted Development", "LLM APIs"
                        ].map((skill, i) => (
                          <motion.li
                            key={skill}
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.2 + (i * 0.08), type: "spring", stiffness: 300, damping: 25 }}
                            whileHover={{ x: 8 }}
                            className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group/item"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-accent group-hover/item:shadow-[0_0_8px_var(--theme-accent)] transition-all duration-300"></span>
                            {skill}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* 🌐 Cloud & Deployment (Moved to 4th) */}
                    <div>
                      <h4 className="text-lg font-bold flex items-center gap-2 mb-6 text-slate-800 dark:text-slate-100 border-b border-black/5 dark:border-white/10 pb-3">
                        🌐 Cloud
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {[
                          "Firebase Hosting", "Firebase Console", "Vercel", "Netlify"
                        ].map((skill, i) => (
                          <motion.li
                            key={skill}
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.3 + (i * 0.08), type: "spring", stiffness: 300, damping: 25 }}
                            whileHover={{ x: 8 }}
                            className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors cursor-pointer flex items-center gap-3 group/item"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-blue-500 group-hover/item:shadow-[0_0_8px_#3b82f6] transition-all duration-300"></span>
                            {skill}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* 📚 Currently Learning (Moved to Last) */}
                    <div>
                      <h4 className="text-lg font-bold flex flex-wrap items-center gap-2 mb-6 text-slate-800 dark:text-slate-100 border-b border-black/5 dark:border-white/10 pb-3">
                        📚 Learning
                        <span className="text-[10px] bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded-full uppercase tracking-wider border border-yellow-500/20 ml-1 flex items-center gap-1 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                          <FiClock size={10} className="animate-pulse" /> Active
                        </span>
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {[
                          "C", "C++", "Java", "Python", "Node.js", "Next.js"
                        ].map((skill, i) => (
                          <motion.li
                            key={skill}
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.4 + (i * 0.08), type: "spring", stiffness: 300, damping: 25 }}
                            whileHover={{ x: 8 }}
                            className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-yellow-500 transition-colors cursor-pointer flex items-center gap-3 group/item"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-yellow-500 group-hover/item:shadow-[0_0_8px_var(--color-yellow-500)] transition-all duration-300"></span>
                            {skill}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </motion.div>

                {/* Education / Global Reach Card */}
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.5, damping: 20 }}
                  whileHover={{ scale: 1.01, y: -5, boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.4)" }}
                  className="lg:col-span-3 glass bg-white/60 dark:bg-black/60 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group border border-black/5 dark:border-white/10 hover:border-accent/50 transition-all duration-500 shadow-2xl"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-accent/5 blur-[180px] rounded-full group-hover:bg-accent/20 transition-colors duration-700 pointer-events-none"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">

                    {/* Education Timeline */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <FiBook className="text-accent" size={28} />
                        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Education</h3>
                      </div>

                      <div ref={educationRef} className="relative ml-3 space-y-10 pb-4">
                        {/* Animated Timeline Line Linked to Scroll */}
                        <motion.div
                          style={{ height: eduLineHeight }}
                          className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-accent via-success to-success origin-top z-0"
                        />

                        <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", bounce: 0.5 }} className="relative pl-8">
                          <motion.div
                            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 2.5, type: "spring" }} viewport={{ once: false, margin: "-100px" }}
                            className="absolute -left-[9px] top-1.5 w-5 h-5 rounded-full bg-accent flex items-center justify-center shadow-[0_0_15px_var(--theme-accent)] z-10"
                          >
                            <FiCheck size={12} className="text-white" />
                          </motion.div>
                          <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">B.E. Computer Science</h4>
                          <p className="text-accent font-bold mt-1 text-sm">SPPU 2022 - 2026</p>
                          <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 font-inter italic border-l-2 border-primary pl-3">
                            Transforming complex logic into seamless digital experiences.
                          </p>
                        </motion.div>

                        <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", bounce: 0.5 }} className="relative pl-8">
                          <motion.div
                            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.5, type: "spring" }} viewport={{ once: false, margin: "-100px" }}
                            className="absolute -left-[9px] top-1.5 w-5 h-5 rounded-full bg-success flex items-center justify-center shadow-[0_0_15px_var(--color-success)] z-10"
                          >
                            <FiCheck size={12} className="text-white" />
                          </motion.div>
                          <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">12th Grade (HSC)</h4>
                          <p className="text-success font-bold mt-1 text-sm">Science Stream | 2021 - 2022</p>
                        </motion.div>

                        <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", bounce: 0.5 }} className="relative pl-8">
                          <motion.div
                            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }} viewport={{ once: false, margin: "-100px" }}
                            className="absolute -left-[9px] top-1.5 w-5 h-5 rounded-full bg-success flex items-center justify-center shadow-[0_0_15px_var(--color-success)] z-10"
                          >
                            <FiCheck size={12} className="text-white" />
                          </motion.div>
                          <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">10th Grade (SSC)</h4>
                          <p className="text-success font-bold mt-1 text-sm">2019 - 2020</p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Experience Timeline */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <FiBriefcase className="text-secondary" size={28} />
                        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Experience</h3>
                      </div>

                      <div className="relative ml-3 space-y-10 pb-4">
                        <motion.div
                          className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-secondary to-transparent origin-top z-0"
                        />

                        {/* AI & ML Intern Experience */}
                        <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", bounce: 0.5 }} className="relative pl-8">
                          <motion.div
                            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} viewport={{ once: false, margin: "-100px" }}
                            className="absolute -left-[9px] top-1.5 w-5 h-5 rounded-full bg-secondary flex items-center justify-center shadow-[0_0_15px_var(--theme-secondary)] z-10"
                          >
                            <FiCheck size={12} className="text-white" />
                          </motion.div>
                          <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">AI & ML Trainee Intern</h4>
                          <p className="text-secondary font-bold mt-1 text-sm">Vacis Automation Pvt. Ltd.</p>
                          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300 font-inter italic border-l-2 border-secondary pl-3">
                            <p className="mb-3">Worked on industrial AI projects, gaining hands-on experience in machine learning workflows and AI deployment.</p>
                            <ul className="list-none space-y-2 text-slate-600 dark:text-slate-400 not-italic font-medium">
                              <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Developed and optimized AI-powered solutions.</li>
                              <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Worked with ML model training and evaluation.</li>
                              <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Improved custom AI logic and code efficiency.</li>
                              <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Collaborated with engineers in an Agile environment.</li>
                              <li className="flex items-start gap-2"><span className="text-secondary mt-1">•</span> Assisted in testing and deployment of AI applications.</li>
                            </ul>
                          </div>
                        </motion.div>

                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </Reveal>
          </div>
        </section>

        {/* 3. TECH STACK (PROJECT TECHNOLOGIES) */}
        <section id="tech-stack" className="pt-0 pb-32 relative z-20 snap-start snap-always min-h-screen flex flex-col justify-center bg-black/5 dark:bg-white/5 border-y border-white/10">

          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">

            <div className="mb-16">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  💻 Tech <span className="text-primary">Stack</span>
                </h2>
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} transition={{ duration: 1, delay: 0.2 }}
                  className="h-1 flex-grow max-w-[300px] bg-gradient-to-r from-primary to-transparent rounded-full hidden sm:block origin-left"
                ></motion.div>
              </div>
              <motion.p
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }}
                className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl font-inter border-l-2 border-primary pl-4"
              >
                The core technologies I use to build robust, scalable, and intelligent applications.
              </motion.p>
            </div>

            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12">

                {/* Frontend */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  whileHover={{ scale: 1.03, y: -10, boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)" }}
                  className="glass bg-white/60 dark:bg-black/60 p-8 rounded-3xl border border-black/5 dark:border-white/10 hover:border-primary/50 transition-all shadow-xl group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 blur-2xl pointer-events-none"></div>
                  <div className="mb-8 border-b border-black/5 dark:border-white/10 pb-6 relative z-10">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all shadow-inner">
                        <FiMonitor size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Frontend Engineering</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Building responsive, intuitive, and cross-platform user experiences with modern frontend technologies.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {["Flutter", "Dart", "HTML5", "CSS3", "JavaScript (ES6+)", "Material Design", "Responsive UI", "Adaptive Layout", "UI Animation", "State Management", "Custom Widgets"].map((tech) => (
                      <motion.span whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }} key={tech} className="px-3 py-1.5 bg-gradient-to-br from-black/5 to-transparent dark:from-white/10 dark:to-transparent rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 border border-black/10 dark:border-white/10 hover:border-primary hover:text-primary transition-colors cursor-default shadow-sm hover:shadow-md">
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Backend */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, type: "spring", bounce: 0.4 }}
                  whileHover={{ scale: 1.03, y: -10, boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)" }}
                  className="glass bg-white/60 dark:bg-black/60 p-8 rounded-3xl border border-black/5 dark:border-white/10 hover:border-secondary/50 transition-all shadow-xl group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/5 transition-colors duration-500 blur-2xl pointer-events-none"></div>
                  <div className="mb-8 border-b border-black/5 dark:border-white/10 pb-6 relative z-10">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary/20 transition-all shadow-inner">
                        <FiServer size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Backend & Cloud</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Powering secure, scalable, and cloud-connected applications with modern backend services.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {["Firebase", "Cloud Firestore", "Firebase Authentication", "Firebase Storage", "FCM", "REST APIs", "Face API", "OCR APIs", "Firebase Hosting", "Cloud Functions", "Firebase Console"].map((tech) => (
                      <motion.span whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }} key={tech} className="px-3 py-1.5 bg-gradient-to-br from-black/5 to-transparent dark:from-white/10 dark:to-transparent rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 border border-black/10 dark:border-white/10 hover:border-secondary hover:text-secondary transition-colors cursor-default shadow-sm hover:shadow-md">
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Tools */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
                  whileHover={{ scale: 1.03, y: -10, boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)" }}
                  className="glass bg-white/60 dark:bg-black/60 p-8 rounded-3xl border border-black/5 dark:border-white/10 hover:border-accent/50 transition-all shadow-xl group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500 blur-2xl pointer-events-none"></div>
                  <div className="mb-8 border-b border-black/5 dark:border-white/10 pb-6 relative z-10">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent/20 transition-all shadow-inner">
                        <FiTool size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Developer Toolkit</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Professional tools that streamline development, collaboration, and project delivery.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {["Android Studio", "VS Code", "Git", "GitHub", "Postman", "Figma", "Firebase Console", "Chrome DevTools"].map((tech) => (
                      <motion.span whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }} key={tech} className="px-3 py-1.5 bg-gradient-to-br from-black/5 to-transparent dark:from-white/10 dark:to-transparent rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 border border-black/10 dark:border-white/10 hover:border-accent hover:text-accent transition-colors cursor-default shadow-sm hover:shadow-md">
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* AI */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.4 }}
                  whileHover={{ scale: 1.03, y: -10, boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)" }}
                  className="glass bg-white/60 dark:bg-black/60 p-8 rounded-3xl border border-black/5 dark:border-white/10 hover:border-success/50 transition-all shadow-xl group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-success/0 group-hover:bg-success/5 transition-colors duration-500 blur-2xl pointer-events-none"></div>
                  <div className="mb-6 border-b border-black/5 dark:border-white/10 pb-6 relative z-10">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success group-hover:scale-110 group-hover:bg-success/20 transition-all shadow-inner">
                        <FiCpu size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Artificial Intelligence</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Leveraging AI to build smarter applications, automate workflows, and enhance productivity.
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-col gap-5">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-success mb-2">AI Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Prompt Engineering", "AI Integration", "LLM APIs", "AI Assisted Development", "OCR Integration", "Face Recognition", "NLP Basics"].map((tech) => (
                          <motion.span whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }} key={tech} className="px-3 py-1.5 bg-gradient-to-br from-black/5 to-transparent dark:from-white/10 dark:to-transparent rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 border border-black/10 dark:border-white/10 hover:border-success hover:text-success transition-colors cursor-default shadow-sm hover:shadow-md">
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-success mb-2">AI Platforms & Models</h4>
                      <div className="flex flex-wrap gap-2">
                        {["ChatGPT", "Gemini", "Claude", "Cursor AI", "GitHub Copilot", "Perplexity AI", "Grok AI", "Lovable"].map((tech) => (
                          <motion.span whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }} key={tech} className="px-3 py-1.5 bg-gradient-to-br from-black/5 to-transparent dark:from-white/10 dark:to-transparent rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 border border-black/10 dark:border-white/10 hover:border-success hover:text-success transition-colors cursor-default shadow-sm hover:shadow-md">
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </Reveal>
          </div>
        </section>

        {/* 4. CINEMATIC PROJECTS */}
        <section id="projects" className="py-32 relative z-20 bg-transparent min-h-screen">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 mb-20">
            <div className="flex flex-col items-start">
              <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 flex items-center gap-4">
                My <span className="text-primary">Projects</span>
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-primary to-transparent rounded-full mb-6"></div>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-inter">
                A selection of my best work, blending intuitive design with robust engineering.
              </p>
            </div>
          </div>

          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col gap-24 md:gap-32 pb-10">
            {PROJECTS.map((project, index) => (
              <div
                key={project.id}
                className="sticky z-10"
                style={{ top: `calc(100px + ${index * 40}px)` }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 100, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                  className="glass bg-white/80 dark:bg-black/80 rounded-[3rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl flex flex-col-reverse lg:flex-row min-h-[60vh] group/card hover:border-primary/30 transition-all duration-700"
                >
                  {/* Project Info */}
                  <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                    <motion.span
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                      className={`text-sm font-bold uppercase tracking-widest mb-4 ${project.accent}`}
                    >
                      {project.category}
                    </motion.span>
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                      className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-primary group-hover/card:to-secondary transition-all duration-500"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                      className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-inter"
                    >
                      {project.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}
                      className="flex flex-wrap gap-3 mb-12"
                    >
                      {project.tech.map((t, i) => (
                        <motion.span
                          whileHover={{ scale: 1.1, y: -2 }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + (i * 0.05) }}
                          key={t}
                          className="px-4 py-2 bg-black/5 dark:bg-white/5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 border border-black/5 dark:border-white/10 hover:border-primary hover:text-primary transition-colors cursor-default"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                      <a href={project.link} className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(0,0,0,0.1)] group/btn">
                        View Project <FiExternalLink className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </a>
                    </motion.div>
                  </div>

                  {/* Project Visual/Mockup */}
                  <div className={`lg:w-1/2 relative bg-gradient-to-br ${project.color} flex items-center justify-center p-10 min-h-[300px] overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/5 dark:group-hover/card:bg-white/5 transition-colors duration-700 z-0"></div>
                    <motion.div
                      whileHover={{ scale: 1.05, rotateY: -15, rotateX: 10 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="w-full max-w-md aspect-[4/3] bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center justify-center relative z-10 overflow-hidden group-hover/card:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-shadow duration-500"
                      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                    >
                      <motion.div
                        className="w-full h-full relative"
                      >
                        <Image 
                          src={project.image} 
                          alt={project.title} 
                          fill 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover/card:scale-110 transition-transform duration-700 ease-out"
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* 4.5 CERTIFICATIONS */}
        <section id="certifications" className="py-20 md:py-24 relative z-20 bg-transparent overflow-hidden">
          <Reveal>
            <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 mb-16">
              <div className="flex flex-col items-start">
                <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 flex items-center gap-4">
                  My <span className="text-primary">Certifications</span>
                </h2>
                <div className="h-1 w-32 bg-gradient-to-r from-primary to-transparent rounded-full mb-6"></div>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-inter">
                  Continuous learning through industry certifications, technical training, and professional development.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 pb-20">
               <CertificationsCarousel />
            </div>
          </Reveal>
        </section>

        {/* 5. FOOTER */}
        <footer id="contact" className="relative z-20 bg-white dark:bg-black border-t border-black/5 dark:border-white/10 pt-32 pb-10 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 dark:opacity-5"></div>
          <motion.div 
            animate={{ y: [-20, 20, -20], scale: [1, 1.1, 1] }} 
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 w-[50vw] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"
          ></motion.div>
          <motion.div 
            animate={{ y: [20, -20, 20], scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 right-1/4 w-[40vw] h-[300px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none"
          ></motion.div>

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-24">
              {/* Left Side: Contact Info */}
              <Reveal>
                <div className="lg:w-full flex flex-col items-start text-left">
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 dark:text-white tracking-tighter mb-6">
                    Let's <span className="text-primary italic">Connect</span>
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mb-8"></div>
                  <p className="text-xl text-slate-600 dark:text-slate-400 font-inter mb-12 leading-relaxed">
                    I'm always open to discussing product design work, partnership opportunities, or simply having a chat about new tech. Reach out and let's build something great together.
                  </p>
                  <div className="flex flex-col gap-6">
                    <a href="mailto:vaishnavfunde1112@gmail.com" className="inline-flex items-center gap-4 text-2xl font-bold text-slate-800 dark:text-slate-200 hover:text-primary transition-colors group relative">
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform relative z-10 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        <FiMail size={24} />
                      </div>
                      <span className="relative z-10">Say Hello</span> <motion.span animate={{ rotate: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="inline-block origin-bottom-right relative z-10">👋</motion.span>
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Right Side: Contact Form */}
              <Reveal delay={0.2}>
                <div className="w-full glass bg-white/80 dark:bg-black/50 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] group hover:border-primary/30 transition-colors duration-500">
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                    <input type="hidden" name="subject" value="New Contact Message from Portfolio!" />
                    <div className="flex flex-col gap-2 relative z-10">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-primary transition-colors">
                          <FiUser size={18} />
                        </div>
                        <input 
                          type="text" 
                          name="name"
                          placeholder="John Doe" 
                          className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-inter"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 relative z-10">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-primary transition-colors">
                          <FiMail size={18} />
                        </div>
                        <input 
                          type="email" 
                          name="email"
                          placeholder="john@example.com" 
                          className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-inter"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 relative z-10">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Your Message</label>
                      <div className="relative group/input">
                        <div className="absolute top-4 left-0 pl-4 pointer-events-none text-slate-400 group-focus-within/input:text-primary transition-colors">
                          <FiMessageSquare size={18} />
                        </div>
                        <textarea 
                          name="message"
                          placeholder="Tell me about your project..." 
                          rows={4}
                          className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-inter resize-none"
                          required
                        ></textarea>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={formStatus === "submitting"}
                      className={`mt-4 relative z-10 w-full overflow-hidden bg-gradient-custom text-white font-bold text-lg rounded-2xl py-4 px-8 flex items-center justify-center gap-3 transition-all shadow-[0_10px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_15px_30px_rgba(99,102,241,0.5)] group/btn ${formStatus === "submitting" ? "opacity-75 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"}`}
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out"></div>
                      <span className="relative z-10 flex items-center gap-3">
                        {formStatus === "submitting" ? "Sending..." : "Send Message"} 
                        {formStatus !== "submitting" && <FiSend className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />}
                      </span>
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-black/5 dark:border-white/10 pt-10">
                <div className="text-2xl font-extrabold font-space tracking-tighter">
                  Vaishnav<span className="text-primary">.</span>
                </div>

                <div className="flex items-center gap-6">
                  <a href="mailto:vaishnavfunde1112@gmail.com" className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all hover:scale-110 shadow-sm hover:shadow-[0_0_20px_rgba(239,68,68,0.8)]">
                    <FiMail size={20} />
                  </a>
                  <a href="https://github.com/vaishnavfunde" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-slate-800 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all hover:scale-110 shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    <FiGithub size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/vaishnav-funde1112/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all hover:scale-110 shadow-sm hover:shadow-[0_0_20px_rgba(10,102,194,0.8)]">
                    <FiLinkedin size={20} />
                  </a>
                  <a href="https://www.instagram.com/vaishnav_funde/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all hover:scale-110 shadow-sm hover:shadow-[0_0_20px_rgba(225,48,108,0.8)]">
                    <FiInstagram size={20} />
                  </a>
                </div>

                <div className="text-sm text-slate-500 font-inter font-medium text-center md:text-left">
                  © {new Date().getFullYear()} Vaishnav Funde. All Rights Reserved.
                </div>
              </div>
            </Reveal>
          </div>
        </footer>
      </main>

      {/* Premium Animated Success Popup */}
      <AnimatePresence>
        {formStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
            className="fixed bottom-10 right-4 sm:right-10 z-[100] glass bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-success/30 shadow-[0_20px_50px_rgba(34,197,94,0.2)] rounded-3xl p-5 sm:p-6 max-w-sm sm:max-w-md flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center flex-shrink-0 relative overflow-hidden">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.2, type: "spring" }}
              >
                <FiCheck size={24} />
              </motion.div>
              <div className="absolute inset-0 border-2 border-success/30 rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="pt-1">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Thank You! 🌟</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-inter leading-relaxed">
                Your message has been sent successfully. I'll connect with you shortly!
              </p>
            </div>
          </motion.div>
        )}
        
        {formStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
            className="fixed bottom-10 right-4 sm:right-10 z-[100] glass bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-red-500/30 shadow-[0_20px_50px_rgba(239,68,68,0.2)] rounded-3xl p-5 sm:p-6 max-w-sm sm:max-w-md flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0">
              <FiMessageSquare size={24} />
            </div>
            <div className="pt-1">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Oops! Something went wrong</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-inter leading-relaxed">
                Please try again later or reach out directly via email.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
