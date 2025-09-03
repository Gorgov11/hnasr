import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Download, Sun, Moon, ExternalLink, Phone, Menu, X } from "lucide-react";

/**
 * Hassan Nasr — Advanced CV / Portfolio, single-file React component
 * - Tailwind CSS for styling
 * - Framer Motion for tasteful micro-animations
 * - react-three-fiber + drei for a lightweight 3D hero background
 * - Accessible, responsive, print-friendly
 *
 * ✅ How to personalize quickly:
 * 1) Edit the PROFILE, LINKS, SKILLS, EXPERIENCE, PROJECTS, and EDUCATION constants.
 * 2) Replace placeholder links (LinkedIn, GitHub, Email, Phone) with your details.
 * 3) Optional: drop a PDF resume in your site root as "/HassanNasr_CV.pdf" or adjust the href.
 * 4) Want a static HTML export? Ask me and I'll produce one.
 */

// ---------------------------- CONFIGURABLE DATA ---------------------------- //
const PROFILE = {
  name: "Hassan Nasr",
  title: "AI & Automation Architect • Full‑Stack Engineer",
  subtitle:
    "Building ROI‑driven AI systems, modern web apps, and resilient data workflows for Nordic & MENA markets.",
  location: "Oslo, Norway",
  availability: "Open to consulting & partnerships",
};

const LINKS = {
  email: "mailto:hello@yourdomain.com", // ← change
  phone: "tel:+47XXXXXXXX", // ← change or remove button below
  linkedin: "https://www.linkedin.com/in/your-handle", // ← change
  github: "https://github.com/your-handle", // ← change
  resume: "/HassanNasr_CV.pdf", // ← change or keep as placeholder
};

const SKILLS: Array<{ group: string; items: string[] }> = [
  {
    group: "Languages",
    items: ["TypeScript/JavaScript", "Python", "C#", "PHP", "SQL"],
  },
  {
    group: "Frameworks & Runtimes",
    items: ["React/Next.js", ".NET", "Node.js", "Symfony", "Ionic/Capacitor"],
  },
  {
    group: "AI/ML • Data",
    items: ["OpenAI API", "RAG & Vector DBs", "OCR/Document AI", "Pandas/NumPy", "ETL Pipelines"],
  },
  {
    group: "Cloud & DevOps",
    items: ["GCP", "Azure", "Docker", "CI/CD", "Sentry", "Vercel/Netlify"],
  },
  {
    group: "Product & Design",
    items: ["Architecture", "Roadmapping", "UX Systems", "Analytics", "Growth"],
  },
];

const EXPERIENCE: Array<{
  role: string;
  org: string;
  period: string;
  location?: string;
  bullets: string[];
}> = [
  {
    role: "Founder & AI/Automation Architect",
    org: "NorAiO",
    period: "2024 — Present",
    location: "Oslo / Remote",
    bullets: [
      "Built AI transformation playbooks for SMEs and enterprises.",
      "Delivered automation pipelines (OCR → RAG → CRM/ERP) with measurable ROI.",
      "Scoped, priced, and shipped projects end‑to‑end with clear KPIs.",
    ],
  },
  {
    role: "Co‑founder • Full‑Stack Lead",
    org: "Gorgov Digital",
    period: "2020 — Present",
    location: "Remote",
    bullets: [
      "Shipped high‑impact web/apps, ERP integrations, and growth campaigns.",
      "Led architecture and delivery on multi‑stakeholder projects.",
    ],
  },
  {
    role: "Lead Engineer (OCR • Offline‑first)",
    org: "iReceipt / iDocument",
    period: "2018 — 2023",
    bullets: [
      "Designed offline‑first receipt/document scanning (Dexie/IndexedDB).",
      "Integrated Vision/OCR, cloud storage, and analytics for finance ops.",
    ],
  },
  {
    role: "Product Builder • Platform",
    org: "Shiftaat (SaaS)",
    period: "2016 — 2019",
    bullets: [
      "Scheduling & workforce platform akin to Planday; mobile + web.",
      "Implemented roles/permissions, notifications, and billing flows.",
    ],
  },
  {
    role: "Consultant (VAT Automation • Integrations)",
    org: "Momspartner",
    period: "2024 — Present",
    bullets: [
      "Mapped production pipeline; introduced AI‑assisted invoice ingestion.",
      "Proposed .NET upgrade path and reporting revamp with KPI dashboards.",
    ],
  },
];

const PROJECTS: Array<{
  name: string;
  tagline: string;
  stack: string[];
  link?: string;
}> = [
  {
    name: "NorAiO",
    tagline: "AI ops partner: assessments → roadmaps → automated delivery",
    stack: ["Next.js", "OpenAI", "RAG", "Azure/GCP"],
    link: "#",
  },
  {
    name: "Gorgov Digital",
    tagline: "Web, mobile, ERP, and growth for ambitious brands",
    stack: ["React", "Symfony", "Node", "Cloud Run"],
    link: "#",
  },
  {
    name: "iReceipt / iDocument",
    tagline: "OCR receipt & document management — offline‑first",
    stack: ["Ionic", "Capacitor", "Dexie", "Vision/OCR"],
    link: "#",
  },
  {
    name: "Shiftaat",
    tagline: "Scheduling & workforce SaaS for SMEs",
    stack: ["React", "Node", "Postgres", "Twilio"],
    link: "#",
  },
  {
    name: "AI Legion (OSS)",
    tagline: "Open‑source strategy game — AI‑powered tooling",
    stack: ["Vite", "TS", "Three.js"],
    link: "#",
  },
  {
    name: "VAT Automation (Client)",
    tagline: "Invoice ingestion → validation → analytics (KPI/ROI)",
    stack: [".NET", "RPA", "OCR", "Power BI"],
    link: "#",
  },
];

const EDUCATION = [
  {
    title: "Your Degree Here (e.g., B.Sc. Computer Engineering)",
    org: "University / Institution",
    period: "Year — Year",
  },
];

// ------------------------------ UTILITIES ------------------------------ //
function useTheme(): [string, () => void] {
  const [theme, setTheme] = useState<string>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    return saved || "dark";
  });
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return [theme, toggle];
}

// ----------------------------- ANIMATED BACKGROUND ------------------------------ //
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating orbs */}
      <motion.div 
        className="absolute top-20 left-20 w-32 h-32 bg-violet-500/20 rounded-full blur-xl"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute top-40 right-32 w-24 h-24 bg-fuchsia-500/20 rounded-full blur-xl"
        animate={{ 
          y: [0, -15, 0],
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2 
        }}
      />
      <motion.div 
        className="absolute bottom-40 left-1/3 w-28 h-28 bg-blue-500/20 rounded-full blur-xl"
        animate={{ 
          y: [0, -18, 0],
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.55, 0.25]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 4 
        }}
      />
      
      {/* Gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />
      
      {/* Animated shapes */}
      <motion.div 
        className="absolute top-1/3 right-1/4 w-1 h-20 bg-gradient-to-b from-violet-500/30 to-transparent rotate-45"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-1/4 w-1 h-16 bg-gradient-to-b from-fuchsia-500/30 to-transparent -rotate-45"
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}

// --------------------------- UI PRIMITIVES --------------------------- //
function Section({ id, title, subtitle, children }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section id={id} className="relative py-20 sm:py-24" ref={ref}>
      <div className="mx-auto w-full max-w-6xl px-5">
        <motion.div 
          className="mb-10 flex items-end justify-between gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h2>
            {subtitle && (
              <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-300">{subtitle}</p>
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-white/5 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 backdrop-blur">
      {children}
    </span>
  );
}

function Card({ children, className = "" }: any) {
  return (
    <motion.div 
      className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-white/5 backdrop-blur shadow-sm transition-all duration-300 ${className}`}
      whileHover={{ 
        y: -2, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
    >
      {children}
    </motion.div>
  );
}

function GhostButton({ children, className = "", ...props }: any) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 rounded-xl border border-gray-300/70 dark:border-gray-700/60 bg-white/50 dark:bg-white/5 px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-100 hover:bg-white/80 dark:hover:bg-white/10 transition ${className}`}
    >
      {children}
    </button>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
    
    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  return (
    <form className="mt-4 grid gap-3" onSubmit={handleSubmit} data-testid="form-contact">
      <motion.input 
        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-white/5 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
        placeholder="Your name" 
        name="name" 
        value={formData.name}
        onChange={handleInputChange}
        required 
        data-testid="input-contact-name"
        whileFocus={{ scale: 1.02 }}
      />
      <motion.input 
        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-white/5 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
        placeholder="Email" 
        type="email" 
        name="email" 
        value={formData.email}
        onChange={handleInputChange}
        required 
        data-testid="input-contact-email"
        whileFocus={{ scale: 1.02 }}
      />
      <motion.textarea 
        className="min-h-[120px] w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-white/5 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none" 
        placeholder="Project details" 
        name="message" 
        value={formData.message}
        onChange={handleInputChange}
        required 
        data-testid="input-contact-message"
        whileFocus={{ scale: 1.02 }}
      />
      <motion.button 
        className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all" 
        type="submit" 
        disabled={isSubmitting}
        data-testid="button-contact-submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </div>
        ) : (
          'Send Message'
        )}
      </motion.button>
      
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-green-600 dark:text-green-400 font-medium"
          >
            ✅ Message sent successfully! I'll get back to you soon.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

// ------------------------------- PAGE ------------------------------- //
export default function HassanNasrCV() {
  const [theme, toggleTheme] = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  // Add loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll on nav click
  useEffect(() => {
    const handler = (e: any) => {
      const a = e.target.closest("a[href^='#']");
      if (a) {
        e.preventDefault();
        const id = a.getAttribute("href")!.slice(1);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-black dark:to-zinc-950 flex items-center justify-center">
        <motion.div 
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-8 h-8 border-2 border-violet-600/30 border-t-violet-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading portfolio...</p>
        </motion.div>
      </div>
    );
  }
  
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-violet-50 via-white to-white dark:from-black dark:via-zinc-950 dark:to-black text-gray-900 dark:text-gray-50">
      {/* ANIMATED HERO BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10 h-[70vh] overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/40 to-white dark:from-black/0 dark:via-black/40 dark:to-black" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-20 border-b border-transparent/10 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="text-sm font-semibold tracking-wide text-violet-600 dark:text-violet-400" data-testid="link-logo">HASSAN NASR</a>
          <nav className="hidden gap-6 sm:flex text-sm text-gray-700 dark:text-gray-300">
            <a href="#about" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors" data-testid="link-about">About</a>
            <a href="#skills" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors" data-testid="link-skills">Skills</a>
            <a href="#experience" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors" data-testid="link-experience">Experience</a>
            <a href="#projects" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors" data-testid="link-projects">Projects</a>
            <a href="#contact" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors" data-testid="link-contact">Contact</a>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="sm:hidden p-2 text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <GhostButton onClick={toggleTheme} aria-label="Toggle theme" data-testid="button-theme-toggle">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </GhostButton>
            <a href={LINKS.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 text-white px-4 py-2 text-sm font-semibold hover:bg-violet-700 transition" data-testid="link-resume">
              <Download size={18} /> Resume
            </a>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-black/95 backdrop-blur"
              data-testid="mobile-menu"
            >
              <nav className="flex flex-col gap-4 p-4 text-sm">
                <a href="#about" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>About</a>
                <a href="#skills" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Skills</a>
                <a href="#experience" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Experience</a>
                <a href="#projects" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Projects</a>
                <a href="#contact" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-violet-600 transform-origin-0 z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* HERO */}
      <section id="top" className="relative flex min-h-[64vh] items-center" ref={heroRef}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 py-16 sm:grid-cols-2 sm:py-24">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl font-extrabold tracking-tight"
              data-testid="text-hero-name"
            >
              {PROFILE.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.6 }}
              className="mt-3 text-lg sm:text-xl text-gray-700 dark:text-gray-300"
              data-testid="text-hero-title"
            >
              {PROFILE.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="mt-3 max-w-xl text-base text-gray-600 dark:text-gray-400"
              data-testid="text-hero-subtitle"
            >
              {PROFILE.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.6 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Badge data-testid="badge-location"><MapPin className="mr-1 h-3.5 w-3.5" /> {PROFILE.location}</Badge>
              <Badge data-testid="badge-availability">{PROFILE.availability}</Badge>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href={LINKS.email} className="inline-flex items-center gap-2 rounded-xl bg-gray-900 text-white px-4 py-2 text-sm font-semibold hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition" data-testid="button-email">
                <Mail size={18} /> Email
              </a>
              {LINKS.phone && (
                <a href={LINKS.phone} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold hover:bg-white/60 dark:hover:bg-white/10 transition" data-testid="button-phone">
                  <Phone size={18} /> Call
                </a>
              )}
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold hover:bg-white/60 dark:hover:bg-white/10 transition" data-testid="button-linkedin">
                <Linkedin size={18} /> LinkedIn <ExternalLink size={16} />
              </a>
              <a href={LINKS.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold hover:bg-white/60 dark:hover:bg-white/10 transition" data-testid="button-github">
                <Github size={18} /> GitHub <ExternalLink size={16} />
              </a>
            </motion.div>
          </div>
          <div className="relative hidden sm:block">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-blue-500/10 blur-2xl" />
            <div className="aspect-square w-full rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-white/5 backdrop-blur p-6" data-testid="card-focus">
              <div className="grid h-full place-items-center text-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">Focus</p>
                  <h3 className="mt-2 text-xl font-bold">AI • Automation • Product</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Clean architecture, measurable ROI, delightful UX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" title="About" subtitle="Builder at the intersection of AI, product, and automation.">
        <div className="prose prose-zinc max-w-none dark:prose-invert" data-testid="text-about-content">
          <p>
            I'm an engineer and product builder with 15+ years across web, mobile, and data systems. I help teams ship
            pragmatic AI solutions—OCR → RAG → ERP/CRM automations—that reduce manual work and unlock new revenue.
            I value clear roadmaps, crisp interfaces, and measurable outcomes.
          </p>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills" subtitle="A curated set of tools I reach for often.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s) => (
            <Card key={s.group} className="p-5" data-testid={`card-skill-${s.group.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">{s.group}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <Badge key={item} data-testid={`badge-skill-${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>{item}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title="Experience" subtitle="Recent roles and impact.">
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
          <div className="space-y-6">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="relative pl-10" data-testid={`card-experience-${i}`}>
                <div className="absolute left-0 top-2 grid h-8 w-8 place-items-center rounded-full border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-white/5 backdrop-blur">
                  <div className="h-2.5 w-2.5 rounded-full bg-violet-600" />
                </div>
                <Card className="p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white" data-testid={`text-experience-role-${i}`}>{exp.role}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400" data-testid={`text-experience-org-${i}`}>{exp.org}{exp.location ? ` • ${exp.location}` : ""}</p>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400" data-testid={`text-experience-period-${i}`}>{exp.period}</span>
                  </div>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
                    {exp.bullets.map((b, j) => (
                      <li key={j} data-testid={`text-experience-bullet-${i}-${j}`}>{b}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="Selected Projects" subtitle="A few things I've shipped or am actively building.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.link || "#"}
              target={p.link ? "_blank" : undefined}
              rel={p.link ? "noreferrer" : undefined}
              whileHover={{ y: -4 }}
              className="group"
              data-testid={`card-project-${i}`}
            >
              <Card className="p-5 h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white" data-testid={`text-project-name-${i}`}>{p.name}</h3>
                  <span className="text-[10px] uppercase tracking-widest text-violet-600" data-testid={`text-project-number-${i}`}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400" data-testid={`text-project-tagline-${i}`}>{p.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <Badge key={s} data-testid={`badge-project-stack-${i}-${s.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>{s}</Badge>
                  ))}
                </div>
                {p.link && (
                  <div className="mt-4 inline-flex items-center gap-1 text-sm text-violet-600 group-hover:underline">
                    View <ExternalLink size={14} />
                  </div>
                )}
              </Card>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" title="Education">
        <div className="grid gap-4 md:grid-cols-2">
          {EDUCATION.map((e, i) => (
            <Card key={i} className="p-5" data-testid={`card-education-${i}`}>
              <h3 className="text-base font-semibold" data-testid={`text-education-title-${i}`}>{e.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400" data-testid={`text-education-org-${i}`}>{e.org}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400" data-testid={`text-education-period-${i}`}>{e.period}</p>
            </Card>
          ))}
          {!EDUCATION.length && (
            <Card className="p-5 text-sm text-gray-600 dark:text-gray-400">
              Add your education in the EDUCATION array.
            </Card>
          )}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact" subtitle="Let's build something valuable.">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6" data-testid="card-contact-form">
            <h3 className="text-base font-semibold">Get in touch</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">I typically respond within 1–2 business days.</p>
            <ContactForm />
          </Card>
          <Card className="p-6" data-testid="card-contact-links">
            <h3 className="text-base font-semibold">Direct links</h3>
            <div className="mt-4 grid gap-3 text-sm">
              <a className="inline-flex items-center gap-2 hover:underline" href={LINKS.email} data-testid="link-contact-email"><Mail size={18} /> {LINKS.email.replace("mailto:", "")}</a>
              {LINKS.phone && (
                <a className="inline-flex items-center gap-2 hover:underline" href={LINKS.phone} data-testid="link-contact-phone"><Phone size={18} /> {LINKS.phone.replace("tel:", "")}</a>
              )}
              <a className="inline-flex items-center gap-2 hover:underline" href={LINKS.linkedin} target="_blank" rel="noreferrer" data-testid="link-contact-linkedin"><Linkedin size={18} /> LinkedIn</a>
              <a className="inline-flex items-center gap-2 hover:underline" href={LINKS.github} target="_blank" rel="noreferrer" data-testid="link-contact-github"><Github size={18} /> GitHub</a>
            </div>
            <div className="mt-6">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold hover:bg-white/60 dark:hover:bg-white/10"
                data-testid="button-print"
              >
                <Download size={18} /> Print / Save as PDF
              </button>
            </div>
          </Card>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200/70 dark:border-gray-800/70 py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 text-xs text-gray-500">
          <p data-testid="text-footer-copyright">© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
          <p data-testid="text-footer-tech">Built with React • Tailwind • R3F • Framer Motion</p>
        </div>
      </footer>
    </main>
  );
}
