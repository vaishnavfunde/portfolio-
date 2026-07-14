export const PROJECTS = [
  {
    id: 1,
    title: "RankSetu",
    category: "AI-Powered Competitive Exam Platform",
    description: "An intelligent competitive exam preparation platform designed to replace traditional learning methods with adaptive, AI-driven experiences. It combines mock tests, OCR-based question scanning, and real-time analytics into a single ecosystem.",
    tech: ["Flutter", "Firebase", "Cloud Firestore", "Firebase Auth", "Firebase Storage", "FCM", "OCR", "REST APIs", "AI Integration"],
    link: "/project/1",
    color: "from-primary/20 to-primary/5",
    accent: "text-primary",
    image: "/projects/ranksetu.png",
    problemStatement: "Traditional exam preparation methods lack personalization and efficient progress tracking. Students often struggle to identify their weak areas and waste time manually organizing study materials. There is a need for an intelligent platform that adapts to the learner's pace and provides actionable insights.",
    workingProcess: "1. User Onboarding: Students create profiles and select their target exams.\n2. Diagnostic Test: An initial AI-driven mock test evaluates the baseline performance.\n3. Adaptive Learning: The system generates a personalized study path based on strengths and weaknesses.\n4. OCR Integration: Users can scan physical question papers to digitize and solve them instantly.\n5. Real-time Analytics: A comprehensive dashboard displays progress, accuracy rates, and peer comparisons.",
    features: [
      "AI-driven adaptive mock tests",
      "OCR-based physical question scanning",
      "Real-time performance analytics dashboard",
      "Peer ranking and gamified learning",
      "Seamless Firebase data synchronization"
    ]
  },
  {
    id: 2,
    title: "Academiq",
    category: "Smart Education Management Platform",
    description: "A comprehensive education management system designed for colleges. It centralizes attendance, announcements, assignments, authentication, and role-based access into a unified mobile platform using Face Recognition and Geolocation.",
    tech: ["Flutter", "Firebase", "Cloud Firestore", "Face API", "Geolocation", "Firebase Auth", "REST APIs"],
    link: "/project/2",
    color: "from-secondary/20 to-secondary/5",
    accent: "text-secondary",
    image: "/projects/academiq.png",
    problemStatement: "Colleges often rely on fragmented systems for attendance, assignments, and communication. Manual attendance tracking is time-consuming and prone to proxy, while scattered communication channels lead to missed deadlines and confusion among students and faculty.",
    workingProcess: "1. Secure Authentication: Role-based login for students, faculty, and administrators.\n2. Smart Attendance: Geolocation and Face Recognition verify student presence in the classroom.\n3. Centralized Hub: Faculty upload assignments and announcements directly to the portal.\n4. Notification Engine: Real-time alerts are sent to students for approaching deadlines.\n5. Analytics: Administrators monitor overall college performance and attendance trends.",
    features: [
      "Face Recognition & Geolocation attendance",
      "Role-based access control (Admin, Faculty, Student)",
      "Centralized assignment submission portal",
      "Real-time college announcements & push notifications",
      "Comprehensive attendance analytics"
    ]
  },
  {
    id: 3,
    title: "AI Dost",
    category: "Offline AI Chat Assistant",
    description: "An offline-first intelligent chatbot that delivers AI-powered assistance without relying on continuous internet connectivity. It focuses on fast local responses, privacy, and efficient knowledge retrieval.",
    tech: ["Flutter", "SQLite", "NLP", "Offline AI Frameworks"],
    link: "/project/3",
    color: "from-accent/20 to-accent/5",
    accent: "text-accent",
    image: "/projects/aidost.png",
    problemStatement: "Most AI assistants require a constant internet connection, which compromises privacy and limits usability in low-connectivity areas. Users need a reliable, private, and fast AI companion that functions entirely offline.",
    workingProcess: "1. Local Initialization: The app loads compressed offline NLP models on startup.\n2. Query Processing: User inputs are parsed and processed locally on the device.\n3. Knowledge Retrieval: The SQLite database is queried for context and factual data.\n4. Response Generation: The local model generates human-like responses instantly.\n5. Synchronization: When online, the knowledge base silently syncs and updates in the background.",
    features: [
      "100% Offline AI response generation",
      "Zero data collection for maximum privacy",
      "Lightning-fast local query processing",
      "Robust SQLite knowledge base",
      "Background sync for knowledge updates"
    ]
  },
  {
    id: 4,
    title: "Casho-expense tracker app",
    category: "Personal Productivity & Career Management",
    description: "A productivity application that helps users organize internships, certifications, achievements, projects, and career milestones with analytics and structured records.",
    tech: ["Flutter", "Firebase", "Chart.js", "Local Storage"],
    link: "/project/4",
    color: "from-success/20 to-success/5",
    accent: "text-success",
    image: "/projects/Casho.png",
    problemStatement: "Professionals and students struggle to maintain a centralized record of their career milestones, finances, and achievements. Spreadsheets are tedious, and existing apps are either too complex or lack robust analytics for career growth.",
    workingProcess: "1. Data Entry: Users log their expenses, certifications, and career milestones through a clean UI.\n2. Cloud Sync: Data is securely backed up to Firebase in real-time.\n3. Data Visualization: The app parses raw data to generate intuitive charts and graphs.\n4. Goal Tracking: Users set financial or career targets and monitor their completion rate.\n5. Export: Milestones can be exported as clean, formatted reports for resumes.",
    features: [
      "Intuitive expense and milestone tracking",
      "Interactive data visualization with Chart.js",
      "Real-time cross-device sync via Firebase",
      "Customizable goal setting and tracking",
      "Secure local storage caching for offline viewing"
    ]
  }
];
