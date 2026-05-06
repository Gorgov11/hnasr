import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import {
  Code2, Globe, Smartphone, ShoppingCart, GraduationCap, BarChart3,
  Palette, Video, Megaphone, Shield, Brain, Bot, Zap, Eye, MessageSquare,
  TrendingUp, Search, Share2, Mail, Users, Star, Award, ChevronDown,
  ArrowRight, Menu, X, Phone, MapPin, ExternalLink, CheckCircle,
  Cpu, Database, LineChart, Layers, Sparkles, Workflow, Target,
  Camera, Wifi, Play, Send, ChevronRight, Building2, Monitor
} from "lucide-react";

// ─────────────────────────────────────────
//  BRAND DATA
// ─────────────────────────────────────────
const BRAND = {
  name: "DGC",
  fullName: "Digital Game Changers",
  tagline: "We Turn Bold Ideas Into Digital Realities",
  subtitle: "From AI-powered software to immersive branding — we build, grow, and transform businesses across the globe.",
  email: "Info@dgcc.ae",
  phone: "+971 56 111 5659",
  website: "www.dgcc.ae",
  instagram: "instagram.com/dgcc.ae",
  location: "Dubai, United Arab Emirates",
};

const STATS = [
  { value: "150+", label: "Projects Delivered" },
  { value: "10+", label: "Countries Served" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "8+", label: "Years Experience" },
];

// ─────────────────────────────────────────
//  SERVICES DATA
// ─────────────────────────────────────────
const SOFTWARE_SERVICES = [
  { icon: Code2, title: "Custom Software Development", desc: "Tailor-made software solutions built around your unique business requirements." },
  { icon: Globe, title: "Web Application Development", desc: "Scalable, high-performance web apps for businesses of all sizes." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform iOS & Android apps using Flutter, React Native, and Native technologies." },
  { icon: Monitor, title: "Corporate Identity Websites", desc: "Brand-driven websites that powerfully reflect your identity and values." },
  { icon: ShoppingCart, title: "E-commerce Development", desc: "Secure, conversion-optimized online stores with seamless shopping experiences." },
  { icon: GraduationCap, title: "LMS Development", desc: "Custom Learning Management Systems for educational institutions and enterprises." },
  { icon: BarChart3, title: "ERP / CRM Systems", desc: "Tailored business management systems that streamline operations and boost productivity." },
  { icon: Palette, title: "UI/UX Design", desc: "Human-centered design that delivers exceptional user experiences across all platforms." },
];

const MARKETING_SERVICES = [
  { icon: Search, title: "SEO Optimization", desc: "Drive organic traffic with data-driven search engine optimization strategies." },
  { icon: Share2, title: "Social Media Marketing", desc: "Engaging campaigns on Facebook, Instagram, TikTok, LinkedIn, Snapchat & Threads." },
  { icon: Mail, title: "Email Marketing", desc: "Targeted email campaigns that nurture leads and drive conversions." },
  { icon: Target, title: "Media Buying & Ads", desc: "ROI-focused paid advertising on Google, Meta, LinkedIn & all major platforms." },
  { icon: Users, title: "Influencer Marketing", desc: "Strategic partnerships with influencers to amplify your brand authentically." },
  { icon: TrendingUp, title: "Affiliate Marketing", desc: "Performance-driven affiliate programs to expand your reach and revenue." },
  { icon: Star, title: "Reputation Management", desc: "Monitor and enhance your brand's online reputation across all channels." },
  { icon: Layers, title: "Content Marketing", desc: "Compelling content strategies that attract, engage, and convert your audience." },
];

const CREATIVE_SERVICES = [
  { icon: Palette, title: "Branding & Logo Design", desc: "Memorable brand identities that resonate with your target audience." },
  { icon: Video, title: "Video Production", desc: "Professional video content from concept to final delivery." },
  { icon: Camera, title: "Photography", desc: "360° photography and professional photo shoots for all your needs." },
  { icon: Megaphone, title: "BTL Marketing", desc: "Targeted below-the-line campaigns that hit specific audience segments." },
  { icon: GraduationCap, title: "LMS Platforms", desc: "Complete online education hubs supporting classroom and distance learning." },
  { icon: Wifi, title: "CCTV & Security Systems", desc: "Advanced surveillance and security infrastructure for your business." },
];

// ─────────────────────────────────────────
//  AI SERVICES DATA
// ─────────────────────────────────────────
const AI_SERVICES = [
  { icon: Bot, title: "AI Chatbot Development", desc: "Intelligent conversational AI for customer support, lead generation, and business automation.", color: "from-cyan-500 to-blue-600" },
  { icon: Brain, title: "Machine Learning Solutions", desc: "Custom ML models trained on your data to deliver predictive insights and automation.", color: "from-purple-500 to-pink-600" },
  { icon: Eye, title: "Computer Vision", desc: "Image recognition, object detection, and visual AI systems for real-world applications.", color: "from-emerald-500 to-teal-600" },
  { icon: MessageSquare, title: "Natural Language Processing", desc: "Text analysis, sentiment detection, translation, and intelligent document processing.", color: "from-orange-500 to-red-600" },
  { icon: Workflow, title: "AI Business Automation", desc: "Intelligent workflow automation that eliminates repetitive tasks and scales operations.", color: "from-indigo-500 to-violet-600" },
  { icon: Sparkles, title: "AI Content Generation", desc: "Automated content creation at scale using cutting-edge generative AI models.", color: "from-yellow-500 to-amber-600" },
  { icon: LineChart, title: "Predictive Analytics", desc: "Data-driven forecasting models that help you anticipate trends and make smarter decisions.", color: "from-rose-500 to-pink-600" },
  { icon: Database, title: "AI Data Engineering", desc: "RAG pipelines, vector databases, and AI-ready data infrastructure for your organization.", color: "from-teal-500 to-cyan-600" },
  { icon: Cpu, title: "Custom AI Model Training", desc: "Fine-tuned AI models built on your proprietary data for domain-specific intelligence.", color: "from-violet-500 to-purple-600" },
  { icon: Zap, title: "AI-Powered Digital Marketing", desc: "AI-driven campaign optimization, audience targeting, and personalization at scale.", color: "from-sky-500 to-blue-600" },
];

// ─────────────────────────────────────────
//  PORTFOLIO DATA
// ─────────────────────────────────────────
const PORTFOLIO = [
  {
    title: "Mystery of Hajj & Umrah",
    category: "Web Development",
    region: "KSA",
    desc: "A comprehensive digital platform providing an immersive and informative experience about Hajj and Umrah, combining cultural sensitivity with cutting-edge web technology.",
    tags: ["Web Design", "CMS", "UI/UX"],
    gradient: "from-emerald-600 to-teal-800",
  },
  {
    title: "Kabbani Furniture",
    category: "E-commerce + Mobile App",
    region: "UAE / KSA",
    desc: "Full e-commerce ecosystem with website and Android/iOS apps that generated thousands of orders. Dramatically transformed the brand's digital presence.",
    tags: ["E-commerce", "iOS App", "Android App"],
    gradient: "from-violet-600 to-purple-800",
  },
  {
    title: "TravAmerica",
    category: "Travel E-commerce",
    region: "USA",
    desc: "Feature-rich travel booking platform for this US-based agency, streamlining trip booking and significantly improving digital reach and customer experience.",
    tags: ["E-commerce", "Booking System", "Travel"],
    gradient: "from-blue-600 to-indigo-800",
  },
  {
    title: "CDE Jewelry",
    category: "Mobile App",
    region: "International",
    desc: "Luxury mobile shopping experience for iOS and Android, reflecting the elegance of the CDE brand with seamless navigation and secure payments.",
    tags: ["iOS App", "Android App", "Luxury Retail"],
    gradient: "from-amber-600 to-orange-800",
  },
  {
    title: "MK Kabbani UAE",
    category: "Mobile App",
    region: "UAE",
    desc: "Sophisticated iOS and Android apps tailored for the UAE market, delivering a smooth, intuitive furniture shopping journey for customers.",
    tags: ["iOS App", "Android App", "E-commerce"],
    gradient: "from-rose-600 to-pink-800",
  },
  {
    title: "The Perk Café",
    category: "Digital Marketing",
    region: "UAE",
    desc: "Global Campaign introducing specialty drinks from 6 countries. Significant increase in customer engagement and sales positioning Perk as a coffee innovation leader.",
    tags: ["Social Media", "Campaign", "Branding"],
    gradient: "from-cyan-600 to-sky-800",
  },
  {
    title: "Little Leaders Kids Salon",
    category: "Branding + Marketing",
    region: "UAE",
    desc: "Creative 3D brand characters embodying the 'Little Leaders' spirit, deployed across digital platforms creating a memorable and engaging brand identity.",
    tags: ["Branding", "3D Design", "Social Media"],
    gradient: "from-lime-600 to-green-800",
  },
  {
    title: "Joval Real Estate",
    category: "Branding",
    region: "Egypt",
    desc: "Elegant branding for Joval Real Estate Compound by Citadel Developments — logo and comprehensive brand strategy elevating market presence.",
    tags: ["Branding", "Logo", "Real Estate"],
    gradient: "from-teal-600 to-emerald-800",
  },
  {
    title: "Delight Pack",
    category: "Branding",
    region: "China",
    desc: "Luxury branding for this jewelry packaging and display manufacturer, encapsulating elegance, precision, and sophistication across all materials.",
    tags: ["Branding", "Logo", "Luxury"],
    gradient: "from-purple-600 to-indigo-800",
  },
];

const PORTFOLIO_FILTERS = ["All", "Web Development", "E-commerce + Mobile App", "Mobile App", "Digital Marketing", "Branding", "Branding + Marketing"];

// ─────────────────────────────────────────
//  CLIENTS DATA
// ─────────────────────────────────────────
const CLIENT_REGIONS = [
  { region: "United Arab Emirates", flag: "🇦🇪", clients: ["Kabbani Furniture", "MK Kabbani", "The Perk Café", "West Laundry", "London Juice", "Little Leaders"] },
  { region: "Saudi Arabia", flag: "🇸🇦", clients: ["Mystery of Hajj & Umrah", "Kabbani KSA"] },
  { region: "Qatar", flag: "🇶🇦", clients: ["Regional Clients"] },
  { region: "Egypt", flag: "🇪🇬", clients: ["Joval Real Estate", "East Point Investments", "A.D Designer"] },
  { region: "China", flag: "🇨🇳", clients: ["Delight Pack"] },
  { region: "United States", flag: "🇺🇸", clients: ["TravAmerica"] },
  { region: "United Kingdom", flag: "🇬🇧", clients: ["UK Partners"] },
  { region: "Norway", flag: "🇳🇴", clients: ["Nordic Clients"] },
];

// ─────────────────────────────────────────
//  ANIMATED COUNTER
// ─────────────────────────────────────────
function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericPart = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * numericPart));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, numericPart]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─────────────────────────────────────────
//  PARTICLE CANVAS BACKGROUND
// ─────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }> = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
        ctx.fill();
      });
      // Draw connecting lines
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - dist / 120) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

// ─────────────────────────────────────────
//  SECTION WRAPPER
// ─────────────────────────────────────────
function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

function SectionHeader({ title, subtitle, accent }: { title: string; subtitle: string; accent?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      {accent && (
        <span className="inline-block text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
          {accent}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">{title}</h2>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
    </motion.div>
  );
}

// ─────────────────────────────────────────
//  NAVBAR
// ─────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "AI", href: "#ai-services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050a0f]/95 backdrop-blur-xl border-b border-cyan-500/10 shadow-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/50 transition-all">
            <span className="text-white font-black text-sm">DGC</span>
          </div>
          <span className="text-white font-bold text-lg hidden sm:block">
            Digital<span className="text-cyan-400"> Game </span>Changers
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="px-4 py-2 text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors rounded-lg hover:bg-cyan-500/5"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => scrollTo("#contact")}
            className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105"
          >
            Get Started
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#050a0f]/98 backdrop-blur-xl border-t border-cyan-500/10"
          >
            <div className="px-4 py-6 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-3 text-slate-300 hover:text-cyan-400 text-base font-medium transition-colors rounded-lg hover:bg-cyan-500/10"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#contact")}
                className="mt-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─────────────────────────────────────────
//  HERO SECTION
// ─────────────────────────────────────────
function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050a0f]">
      {/* Animated background */}
      <ParticleCanvas />

      {/* Radial gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-8"
        >
          <Sparkles size={14} />
          <span>Now with AI-Powered Solutions</span>
        </motion.div>

        {/* Company name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-2 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              DGC
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 font-light mb-2">Digital Game Changers</p>
        </motion.div>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-6 mb-4 leading-tight"
        >
          {BRAND.tagline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto mb-10"
        >
          {BRAND.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <button
            onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            Explore Services <ArrowRight size={18} />
          </button>
          <button
            onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 border border-cyan-500/30 text-cyan-400 font-semibold rounded-xl hover:bg-cyan-500/10 transition-all hover:scale-105"
          >
            View Portfolio
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-3xl font-black text-cyan-400 mb-1">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────
//  ABOUT SECTION
// ─────────────────────────────────────────
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section id="about" className="bg-[#050a0f]">
      <SectionHeader
        accent="Who We Are"
        title="Driven by Innovation, Powered by Excellence"
        subtitle="We are a global digital agency transforming businesses through technology, creativity, and strategy."
      />
      <div ref={ref} className="grid lg:grid-cols-3 gap-8">
        {[
          {
            title: "About DGC",
            icon: Building2,
            color: "from-cyan-500 to-blue-600",
            content: "Digital Game Changers is a full-service digital agency with deep expertise in software development, digital marketing, creative design, and AI solutions. We connect businesses globally, implementing cutting-edge technologies and delivering diverse, high-impact market solutions across the UAE, GCC, and beyond.",
          },
          {
            title: "Our Mission",
            icon: Target,
            color: "from-violet-500 to-purple-600",
            content: "To be a trusted technology partner for businesses of all sizes and governmental organizations. We aim to demystify technology — acting as a tech arm to support client growth. Our focus is on creating long-term relationships, understanding unique needs, and delivering tailor-made, high-quality solutions on time and within budget.",
          },
          {
            title: "Our Vision",
            icon: Star,
            color: "from-emerald-500 to-teal-600",
            content: "To become a global leader in software development, digital marketing, and AI innovation — guided by integrity, excellence, and continuous improvement. We are dedicated to empowering small and medium businesses and governmental organizations with the tools and expertise they need to realize their full potential worldwide.",
          },
        ].map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-8 hover:border-cyan-500/20 transition-all hover:bg-white/[0.05] group"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
              <card.icon size={22} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{card.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {["Integrity", "Innovation", "Excellence", "Partnership"].map((val) => (
          <div key={val} className="flex items-center gap-3 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15">
            <CheckCircle size={18} className="text-cyan-400 shrink-0" />
            <span className="text-white font-medium">{val}</span>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}

// ─────────────────────────────────────────
//  SERVICES SECTION
// ─────────────────────────────────────────
function ServicesSection() {
  const [activeTab, setActiveTab] = useState<"software" | "marketing" | "creative">("software");

  const tabs = [
    { id: "software" as const, label: "Software Development", services: SOFTWARE_SERVICES },
    { id: "marketing" as const, label: "Digital Marketing", services: MARKETING_SERVICES },
    { id: "creative" as const, label: "Creative & Other", services: CREATIVE_SERVICES },
  ];

  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <Section id="services" className="bg-gradient-to-b from-[#050a0f] to-[#080d14]">
      <SectionHeader
        accent="What We Do"
        title="End-to-End Digital Services"
        subtitle="From code to campaigns, from design to deployment — we cover every dimension of your digital journey."
      />

      {/* Tab buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                : "bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:border-cyan-500/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Service grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {current.services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-cyan-500/25 hover:bg-white/[0.06] transition-all group cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <svc.icon size={20} className="text-cyan-400" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-2 leading-snug">{svc.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}

// ─────────────────────────────────────────
//  AI SERVICES SECTION
// ─────────────────────────────────────────
function AIServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    { role: "assistant", text: "Hi! I'm DGC's AI assistant. Ask me about our AI services, solutions, or how we can transform your business with artificial intelligence." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.response || "I'll get back to you on that shortly." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Sorry, I'm having trouble connecting right now. Please reach out to us directly at Info@dgcc.ae" }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  return (
    <Section id="ai-services" className="bg-gradient-to-b from-[#080d14] to-[#050a0f]">
      {/* Special AI header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
        ref={ref}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm font-medium mb-4">
          <Brain size={14} />
          <span>Artificial Intelligence</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
          AI-Powered <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Solutions</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Harness the power of artificial intelligence to automate, innovate, and gain a decisive competitive advantage in your market.
        </p>
      </motion.div>

      {/* AI Service Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
        {AI_SERVICES.map((ai, i) => (
          <motion.div
            key={ai.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/25 hover:bg-white/[0.05] transition-all group cursor-default"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ai.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
              <ai.icon size={18} className="text-white" />
            </div>
            <h4 className="text-white font-semibold text-sm mb-2 leading-snug">{ai.title}</h4>
            <p className="text-slate-500 text-xs leading-relaxed">{ai.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* AI Chatbot Demo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-500/20 p-8"
      >
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">DGC AI Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-xs">Online</span>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Experience AI in Action</h3>
            <p className="text-slate-400 mb-6">
              Chat with our AI assistant to learn about our services, explore AI possibilities for your business, or get answers to your questions — powered by the latest AI technology.
            </p>
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all hover:scale-105 flex items-center gap-2"
            >
              <MessageSquare size={18} />
              {chatOpen ? "Close Chat" : "Start AI Chat"}
            </button>
          </div>

          {/* Chat Widget */}
          <AnimatePresence>
            {chatOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: 20 }}
                className="flex-1 max-w-md w-full"
              >
                <div className="rounded-2xl bg-[#0a0f1a] border border-white/[0.08] overflow-hidden">
                  {/* Chat header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border-b border-white/[0.06] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                      <Bot size={15} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">DGC AI Assistant</p>
                      <p className="text-emerald-400 text-xs">Powered by GPT-5</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="h-64 overflow-y-auto p-4 flex flex-col gap-3">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                            : "bg-white/[0.05] text-slate-300"
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="px-4 py-3 rounded-xl bg-white/[0.05]">
                          <div className="flex gap-1">
                            {[0, 1, 2].map((d) => (
                              <span key={d} className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-3 border-t border-white/[0.06] flex gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Ask about AI services..."
                      className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3 py-2 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500/40"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={loading}
                      className="w-9 h-9 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      <Send size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Section>
  );
}

// ─────────────────────────────────────────
//  PORTFOLIO SECTION
// ─────────────────────────────────────────
function PortfolioSection() {
  const [filter, setFilter] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const filtered = filter === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter);

  return (
    <Section id="portfolio" className="bg-[#050a0f]">
      <SectionHeader
        accent="Our Work"
        title="Portfolio of Success"
        subtitle="A selection of projects where we've transformed visions into powerful digital realities."
      />

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-10" ref={ref}>
        {["All", "Web Development", "E-commerce + Mobile App", "Mobile App", "Digital Marketing", "Branding"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              filter === f
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                : "bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:border-cyan-500/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.07] hover:border-cyan-500/20 transition-all group hover:-translate-y-1"
            >
              {/* Gradient header */}
              <div className={`h-36 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-3 left-4">
                  <span className="px-2 py-1 rounded-md bg-black/30 text-white text-xs font-medium backdrop-blur-sm">
                    {project.region}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <ExternalLink size={16} className="text-white/50 group-hover:text-white transition-colors" />
                </div>
              </div>

              <div className="p-5">
                <div className="text-xs text-cyan-400 font-medium mb-1">{project.category}</div>
                <h4 className="text-white font-bold text-base mb-2">{project.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-400 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}

// ─────────────────────────────────────────
//  CLIENTS SECTION
// ─────────────────────────────────────────
function ClientsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Section id="clients" className="bg-gradient-to-b from-[#050a0f] to-[#080d14]">
      <SectionHeader
        accent="Global Reach"
        title="Trusted by Clients Worldwide"
        subtitle="From the UAE to the USA, from China to Norway — our impact spans continents and industries."
      />

      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CLIENT_REGIONS.map((region, i) => (
          <motion.div
            key={region.region}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 hover:border-cyan-500/20 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{region.flag}</span>
              <h4 className="text-white font-semibold text-sm leading-tight">{region.region}</h4>
            </div>
            <ul className="space-y-1.5">
              {region.clients.map((client) => (
                <li key={client} className="flex items-center gap-2 text-slate-400 text-xs">
                  <ChevronRight size={12} className="text-cyan-500 shrink-0" />
                  {client}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12 flex flex-wrap justify-center gap-8 items-center"
      >
        {[
          { icon: Award, label: "Award-Winning Agency" },
          { icon: Globe, label: "10+ Countries" },
          { icon: Users, label: "150+ Happy Clients" },
          { icon: Shield, label: "Trusted & Secure" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-slate-400">
            <item.icon size={18} className="text-cyan-400" />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}

// ─────────────────────────────────────────
//  CONTACT SECTION
// ─────────────────────────────────────────
function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus("sent");
      setForm({ name: "", email: "", company: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" className="bg-[#050a0f]">
      <SectionHeader
        accent="Get In Touch"
        title="Let's Build Something Great"
        subtitle="Ready to transform your business? Tell us about your project and we'll get back to you within 24 hours."
      />

      <div ref={ref} className="grid lg:grid-cols-2 gap-12">
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
          <div className="space-y-5 mb-8">
            {[
              { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
              { icon: Phone, label: "Phone", value: BRAND.phone, href: `tel:${BRAND.phone.replace(/\s/g, "")}` },
              { icon: MapPin, label: "Location", value: BRAND.location, href: undefined },
              { icon: Globe, label: "Website", value: BRAND.website, href: `https://${BRAND.website}` },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-white text-sm font-medium hover:text-cyan-400 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white text-sm font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Why choose us */}
          <div className="rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 p-6">
            <h4 className="text-white font-bold mb-4">Why Choose DGC?</h4>
            <ul className="space-y-3">
              {[
                "Expert team with 8+ years of experience",
                "Full-service agency — one partner for everything",
                "AI-powered solutions for competitive advantage",
                "Delivered projects across 10+ countries",
                "On-time delivery with transparent communication",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-slate-400 text-sm">
                  <CheckCircle size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-xs font-medium mb-1.5 block">Full Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Smith"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-medium mb-1.5 block">Email Address *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@company.com"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-xs font-medium mb-1.5 block">Company Name</label>
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Your Company Ltd."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors"
              />
            </div>

            <div>
              <label className="text-slate-400 text-xs font-medium mb-1.5 block">Service Interested In</label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full bg-[#0a0f1a] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/40 transition-colors"
              >
                <option value="">Select a service...</option>
                <option>Custom Software Development</option>
                <option>Mobile App Development</option>
                <option>E-commerce Website</option>
                <option>Digital Marketing</option>
                <option>AI Solutions</option>
                <option>Branding & Design</option>
                <option>ERP / CRM Systems</option>
                <option>LMS Development</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 text-xs font-medium mb-1.5 block">Message *</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your project, goals, and timeline..."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {status === "sending" ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : status === "sent" ? (
                <>
                  <CheckCircle size={18} />
                  Message Sent! We'll be in touch.
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>

            {status === "error" && (
              <p className="text-red-400 text-sm text-center">Something went wrong. Please email us directly at {BRAND.email}</p>
            )}
          </form>
        </motion.div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────
//  FOOTER
// ─────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#030508] border-t border-white/[0.05] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-black text-sm">DGC</span>
              </div>
              <span className="text-white font-bold">Digital Game Changers</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              A global digital agency transforming businesses through technology, creativity, and AI innovation.
            </p>
            <div className="flex gap-3">
              <a href={`mailto:${BRAND.email}`} className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                <Mail size={16} />
              </a>
              <a href={`https://${BRAND.instagram}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-white font-semibold mb-4">Services</h5>
            <ul className="space-y-2 text-slate-500 text-sm">
              {["Software Development", "Mobile Apps", "E-commerce", "Digital Marketing", "AI Solutions", "Branding & Design", "Video & Photography", "ERP / CRM"].map((s) => (
                <li key={s} className="hover:text-slate-300 transition-colors cursor-default">{s}</li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-white font-semibold mb-4">Company</h5>
            <ul className="space-y-2 text-slate-500 text-sm">
              {["About Us", "Portfolio", "Clients", "AI Services", "Contact", "Privacy Policy", "Terms of Service"].map((s) => (
                <li key={s} className="hover:text-slate-300 transition-colors cursor-default">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white font-semibold mb-4">Contact</h5>
            <div className="space-y-3 text-slate-500 text-sm">
              <div className="flex items-start gap-2">
                <Mail size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white transition-colors">{BRAND.email}</a>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">{BRAND.phone}</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                <span>{BRAND.location}</span>
              </div>
              <div className="flex items-start gap-2">
                <Globe size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                <a href={`https://${BRAND.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{BRAND.website}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-600 text-sm">© 2024 Digital Game Changers (DGC). All rights reserved.</p>
          <p className="text-slate-600 text-sm flex items-center gap-1">
            Built with <span className="text-cyan-500">AI-powered</span> technology
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────
export default function DGCWebsite() {
  return (
    <div className="bg-[#050a0f] min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <AIServicesSection />
      <PortfolioSection />
      <ClientsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
