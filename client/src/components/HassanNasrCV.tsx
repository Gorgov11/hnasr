import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Download, Sun, Moon, ExternalLink, Phone, Menu, X, MessageCircle, Globe, Send } from "lucide-react";
import { LogoLoop } from "./LogoLoop";
import MagicBento from "./MagicBento";
import Hyperspeed from "./Hyperspeed";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, 
  SiOpenai, SiMongodb, SiPostgresql, SiDocker, SiAwslambda, SiGooglecloud,
  SiFigma, SiAdobephotoshop, SiAdobeillustrator, SiCanva, SiNotion,
  SiSlack, SiZapier, SiHubspot, SiSalesforce, SiShopify, SiWordpress,
  SiStripe, SiPaypal, SiGit, SiGithub, SiVercel, SiNetlify, SiFramer,
  SiJavascript, SiHtml5, SiCss3, SiBootstrap, SiVuedotjs, SiAngular,
  SiExpress, SiFlask, SiDjango, SiMysql, SiRedis, SiElasticsearch,
  SiKubernetes, SiTerraform, SiJenkins, SiGitlab
} from 'react-icons/si';

// Import generated images
import heroBackground from "@assets/generated_images/AI_tech_portfolio_background_ab8943e0.png";
import ecommerceImg from "@assets/generated_images/E-commerce_technology_illustration_350c8af2.png";
import aiAutomationImg from "@assets/generated_images/AI_automation_concept_art_540b5982.png";
import digitalTransformImg from "@assets/generated_images/Digital_transformation_concept_3fe7574a.png";
import travelTechImg from "@assets/generated_images/Travel_tech_illustration_4501efe1.png";
import professionalHeadshot from "@assets/image_1759269852629.png";
import skillsInfographic from "@assets/generated_images/Technical_skills_infographic_visualization_9c1a056c.png";

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
  email: "mailto:hello@hnasr.com",
  phone: "tel:+4792942017",
  linkedin: "https://www.linkedin.com/in/hassan-o-nasr/",
  github: "https://github.com/Gorgov11",
  resume: "/hassan-nasr-cv.pdf",
};

const SKILLS: Array<{ group: string; items: string[]; description?: string }> = [
  {
    group: "🤖 AI & Automation",
    description: "LLM ecosystem and intelligent workflow automation",
    items: [
      "ChatGPT (Custom GPTs)", "Grok", "Qwen", "Kimi",
      "Microsoft Copilot Studio", "Replit AI", "TempoLabs", "Make.com",
      "MidJourney V6", "Runway Gen-3", "Kling AI", "Stable Diffusion XL",
      "OpenAI Assistants API", "Twilio AI voicebots", "WhatsApp AI",
      "Sintra Analytics", "Databuttons"
    ],
  },
  {
    group: "💻 Development & Systems",
    description: "Full-stack development with modern frameworks and tools",
    items: [
      "Python (AI/automation)", "JavaScript (React/Node)", "PHP (Symfony)", "C++",
      ".NET 8", "React + Tailwind", "Ionic/Capacitor", "Vite",
      "SQL Server", "MySQL", "IndexedDB", "Firestore",
      "GitHub Actions", "Docker", "Sentry", "Vercel", "Google Cloud Functions"
    ],
  },
  {
    group: "📊 Business Systems",
    description: "Enterprise ERP/CRM and compliance-ready integrations",
    items: [
      "Microsoft Dynamics 365", "SAP S/4HANA", "API-based CRM",
      "Power Automate", "Power Apps", "Power BI", "Dataverse",
      "Stripe", "RevenueCat", "SendGrid", "Twilio",
      "SAF-T standards (Norway)", "GDPR-ready data flows"
    ],
  },
  {
    group: "📈 Marketing & Growth",
    description: "AI-driven marketing automation and performance optimization",
    items: [
      "Google Ads (Performance Max)", "Meta Ads Manager", "LinkedIn Campaign Manager",
      "AI-driven keyword research", "Programmatic SEO", "Technical SEO audits",
      "GA4", "Looker Studio", "Hotjar", "AI-based funnel analysis",
      "Adtraction platform", "Referral automation", "Email drip AI tools"
    ],
  },
  {
    group: "🎨 Design & Creative",
    description: "AI-enhanced creative workflows and design systems",
    items: [
      "Adobe Photoshop", "Illustrator", "After Effects",
      "Figma (Design systems)", "Canva Pro (Multi-brand kits)",
      "MidJourney", "Runway Gen-3", "Kaiber", "DID (AI avatars)",
      "Spline 3D", "Automated design templates"
    ],
  },
  {
    group: "⚙️ Productivity & Collaboration",
    description: "AI-enhanced project management and knowledge systems",
    items: [
      "Trello", "Notion (AI-enhanced)", "Jira", "Asana",
      "Google Workspace", "Slack", "Microsoft Teams",
      "Obsidian (PKM)", "Office 365 Copilot", "Miro", "FigJam"
    ],
  },
];

const CAREER_TIMELINE: Array<{
  period: string;
  role: string;
  org: string;
  location?: string;
  description: string;
  achievements: string[];
  tools: string[];
  category: 'Education' | 'Early Career' | 'ERP & Transformation' | 'Digital Agency' | 'AI & Marketing' | 'Research' | 'Current';
}> = [
  {
    period: "2025 — Present",
    role: "Founder & CTO",
    org: "NorAiO",
    location: "Oslo, Norway",
    description: "Building AI automation consultancy & SaaS products for Nordic enterprises",
    achievements: [
      "Services: Process automation, GPT integrations, ERP/CRM AI assistants, SaaS tools",
      "Focus: Nordic enterprises in finance, logistics, healthcare",
      "Built comprehensive AI toolbox for business operations and automation"
    ],
    tools: ["Azure AI", "OpenAI API", "Power Platform", "SAP AI Core", "Figma", "GitHub", "Sentry"],
    category: "Current"
  },
  {
    period: "2023 — 2024",
    role: "AI Research & Development",
    org: "Self-Study",
    description: "Explored & tested next-generation AI tools and workflow automation",
    achievements: [
      "Prompt engineering & GPT building (ChatGPT, Grok, Kimi, Qwen)",
      "AI design & video: MidJourney, Runway, Kling",
      "Workflow automation: TempoLabs, Make.com, Bolt, Sintra",
      "Result: Built full-stack AI toolbox for business ops, marketing, design, and SaaS"
    ],
    tools: ["ChatGPT", "MidJourney", "Runway", "Make.com", "Replit", "AI Code Assistants"],
    category: "Research"
  },
  {
    period: "2021 — 2024",
    role: "AI & Digital Marketing Specialist",
    org: "DGCC.ae",
    location: "Dubai, UAE",
    description: "Designed custom GPTs and AI-powered marketing automation strategies",
    achievements: [
      "Built custom GPTs for content generation & chatbot automation",
      "Integrated AI automation into SEO/SEM campaigns",
      "Optimized ERP/CRM systems with AI data automation"
    ],
    tools: ["OpenAI GPTs", "MidJourney", "Runway", "Replit", "Microsoft Copilot", "Meta Business Suite", "Make.com"],
    category: "AI & Marketing"
  },
  {
    period: "2016 — 2020",
    role: "Founder & Digital Performance Specialist",
    org: "Gorgov Digital",
    location: "Cairo, Egypt",
    description: "Built digital agency serving FMCG, travel, fashion, and government clients",
    achievements: [
      "Obour Land — Corporate site + IR system",
      "TATAS Pro — AV/Security enterprise web platform",
      "TravGlobe / TravAmericaa — Group travel platforms",
      "El Tarzy — Luxury tailoring brand site",
      "Byoot Furniture — Premium showroom branding"
    ],
    tools: ["WordPress", "PHP/Symfony", "SEO", "Google Ads", "Facebook Ads", "GTM", "GA", "Figma", "Adobe Suite"],
    category: "Digital Agency"
  },
  {
    period: "2013 — 2015",
    role: "IT Consultant & ERP Specialist",
    org: "Sanimalis / ProfVet",
    location: "Oslo, Norway",
    description: "Led database integrations and ERP testing for veterinary software solutions",
    achievements: [
      "Database integrations and ERP testing modules",
      "Digital transformation to modernize workflows",
      "Pushed modernization of legacy systems"
    ],
    tools: ["SAP", "Microsoft Dynamics", "SQL Server", ".NET", "Primavera"],
    category: "ERP & Transformation"
  },
  {
    period: "2010 — 2013",
    role: "IT & Digital Specialist",
    org: "Various Companies",
    description: "Early career roles building foundational IT and design skills",
    achievements: [
      "Facility Advertising (2010) — Graphic Designer & IT",
      "Keys Group (2009–2010) — IT Support & ERP",
      "The Way Out ISP (2007–2008) — Corporate Network Engineer",
      "Dot Technology (2006) — Junior Designer"
    ],
    tools: ["Photoshop", "Illustrator", "CorelDraw", "Cisco", "Mikrotik", "Linux", "Dreamweaver", "Flash"],
    category: "Early Career"
  },
  {
    period: "2005 — 2010",
    role: "Computer Science Student",
    org: "MTI University",
    location: "Cairo, Egypt",
    description: "B.Sc. Computer Science with focus on AI, algorithms, and software engineering",
    achievements: [
      "Studied algorithms, data structures, AI, machine learning, databases, cybersecurity",
      "Capstone: AI-powered automation & business intelligence project",
      "Built foundation in programming and AI/ML fundamentals"
    ],
    tools: ["Python", "C++", "PHP", "JavaScript", "SQL", "AI/ML fundamentals"],
    category: "Education"
  }
];

const BRAND_GROUPS: Array<{
  title: string;
  description: string;
  companies: string[];
  highlights: string[];
  category: 'Tech & AI' | 'Retail & Lifestyle' | 'Education & Non-profit' | 'Furniture & Design' | 'Fashion & Luxury';
}> = [
  {
    title: "Tech & AI",
    description: "Brand systems for technology and AI companies",
    companies: ["NorAiO", "iDocument", "DGCC.ae", "Automation Egypt"],
    highlights: [
      "Full brand systems: logo, pitch decks, social templates, presentation kits",
      "Investor-ready visuals and automated design-to-publishing workflows",
      "Canva + Figma + AI-generated creatives integration"
    ],
    category: "Tech & AI"
  },
  {
    title: "Retail & Lifestyle",
    description: "Product packaging and e-commerce brand identities",
    companies: ["Gorgov", "Titans", "RFC", "Great Gourmet", "London Juice", "Glintzia"],
    highlights: [
      "Product packaging designs and e-commerce visuals",
      "Social ads and campaign creative development",
      "Brand playbooks for consistent multi-channel rollout"
    ],
    category: "Retail & Lifestyle"
  },
  {
    title: "Education & Non-profit",
    description: "Educational and NGO brand development",
    companies: ["Edubai", "Little Leaders", "Symbioss Consulting", "Mashrou Group"],
    highlights: [
      "Education-focused brand identities and teaching materials",
      "Book covers and NGO campaign kits",
      "AI-assisted multi-language marketing material"
    ],
    category: "Education & Non-profit"
  },
  {
    title: "Furniture & Design",
    description: "Interior design and furniture brand systems",
    companies: ["MK Kabbani", "Homly", "Delight Pack", "Layers"],
    highlights: [
      "Catalog layouts and showroom signage",
      "Digital brochures and 3D mockups",
      "Figma components for scalable multi-branch marketing"
    ],
    category: "Furniture & Design"
  },
  {
    title: "Fashion & Luxury",
    description: "High-end fashion and luxury brand guidelines",
    companies: ["El Tarzy", "La Borsetta", "Jovial", "Citadel", "Kayan"],
    highlights: [
      "Luxury brand guidelines and lookbooks",
      "Ad campaigns and e-commerce visuals",
      "Product photo retouching and cinematic visuals"
    ],
    category: "Fashion & Luxury"
  }
];

const PROJECTS: Array<{
  name: string;
  role: string;
  period: string;
  tagline: string;
  highlights: string[];
  stack: string[];
  category: 'AI/Automation' | 'E-commerce' | 'Web Development' | 'Digital Transformation' | 'Travel/Tourism' | 'Non-profit';
  status: 'Active' | 'Completed' | 'Advisory';
  link?: string;
}> = [
  {
    name: "NorAiO",
    role: "Founder & CTO",
    period: "Jun 2025 – Present",
    tagline: "AI automation studio helping Nordic SMEs streamline operations",
    highlights: [
      "Designed AI-powered workflows that cut manual tasks and boost productivity",
      "Built reusable components for document automation, RAG chatbots, and analytics"
    ],
    stack: ["AI", "Process Automation", "ERP/CRM Integration", "Power Platform"],
    category: "AI/Automation",
    status: "Active",
    link: "#"
  },
  {
    name: "MK Kabbani – Dubai E-commerce",
    role: "Lead Consultant",
    period: "Jun 2021 – Present",
    tagline: "Scaled furniture e-commerce with conversion-oriented UX",
    highlights: [
      "Storefront optimization, catalog architecture, and payment/shipping integrations",
      "Analytics setup for funnel tracking and merchandise decisions"
    ],
    stack: ["Shopify", "GTM/GA", "CDN", "Search"],
    category: "E-commerce",
    status: "Active"
  },
  {
    name: "Ministry of Hajj & Umrah",
    role: "Front-end Lead & Digital Consultant",
    period: "May 2022 – Jan 2023",
    tagline: "Revamped front-end for accessibility, performance, and clarity",
    highlights: [
      "Design system tokens, RTL support, and Lighthouse performance gains",
      "Enhanced accessibility and user experience for government services"
    ],
    stack: ["Front-end", "Accessibility", "Web Performance", "Design Systems"],
    category: "Digital Transformation",
    status: "Completed"
  },
  {
    name: "Kabbani E-Commerce Group",
    role: "E-commerce Architect",
    period: "Aug 2019 – Present",
    tagline: "Scaled omnichannel retail (28+ branches) with web + mobile commerce",
    highlights: [
      "Click-to-door experience: online purchase, home delivery, and store ops sync",
      "Catalog data model and performance tuning for high SKUs"
    ],
    stack: ["Headless Commerce", "Native App", "PIM", "CDN", "Analytics"],
    category: "E-commerce",
    status: "Active"
  },
  {
    name: "TATAS Pro (AV & Security)",
    role: "Digital Transformation Advisor",
    period: "Apr 2020 – Present",
    tagline: "Enterprise web and partner ecosystem for 125-employee AV/security integrator",
    highlights: [
      "Multi-vendor product catalog and lead routing system",
      "Service/Maintenance center visibility and SLA content management"
    ],
    stack: ["CMS", "Search", "CRM Integration"],
    category: "Digital Transformation",
    status: "Active"
  },
  {
    name: "TravGlobe Group Travel",
    role: "Digital Lead",
    period: "Jun 2018 – Present",
    tagline: "Group travel platform with inquiry → proposal flow",
    highlights: [
      "CRM alignment and lead qualification forms",
      "Streamlined booking and proposal generation workflow"
    ],
    stack: ["CMS", "CRM", "Email Automation"],
    category: "Travel/Tourism",
    status: "Active"
  },
  {
    name: "Travolic Flights Meta-Search",
    role: "Front-end/UX Consultant",
    period: "Apr 2018 – Present",
    tagline: "UX for flight meta-search flows and fare discovery",
    highlights: [
      "Search and filter performance improvements",
      "Enhanced user experience for flight booking platform"
    ],
    stack: ["SPA", "API Integration", "Caching"],
    category: "Travel/Tourism",
    status: "Active"
  },
  {
    name: "Al Zahrawan Foundation",
    role: "Web & Content Lead",
    period: "Jul 2016 – Present",
    tagline: "Sustainable content platform for nationwide non-profit programs",
    highlights: [
      "Donations/info architecture and volunteer onboarding flows",
      "Accessibility-focused design for inclusive user experience"
    ],
    stack: ["CMS", "Accessibility", "SEO"],
    category: "Non-profit",
    status: "Active"
  },
  {
    name: "Obour Land (FMCG)",
    role: "Digital Consultant",
    period: "May 2020 – Present",
    tagline: "Modernized web presence and internal IR/communications workflows",
    highlights: [
      "Website rebuild and content operations optimization",
      "Internal IR system enhancements for faster updates and approvals"
    ],
    stack: ["Web Dev", "Content Ops", "Performance"],
    category: "Digital Transformation",
    status: "Advisory"
  },
  {
    name: "Art City – 360° Virtual Reality",
    role: "XR Producer",
    period: "Jun 2017 – Jul 2017",
    tagline: "Mixed rendered 360° city with live-action capture showcase",
    highlights: [
      "First-of-its-kind 360° virtual reality experience",
      "Combined rendered environments with live-action footage"
    ],
    stack: ["360° Video", "Post-production", "XR"],
    category: "Digital Transformation",
    status: "Completed"
  }
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
  const [chatOpen, setChatOpen] = useState(false);
  const [translationOpen, setTranslationOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const browserLang = navigator.language.split('-')[0];
    return ['en', 'no', 'ar', 'sv'].includes(browserLang) ? browserLang : 'en';
  });
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Translation helper
  const translateText = async (text: string, targetLang: string) => {
    try {
      setIsTranslating(true);
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLanguage: targetLang })
      });
      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  };

  // Chat helper
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Language change handler with content translation
  const changeLanguage = async (lang: string) => {
    setCurrentLanguage(lang);
    
    if (lang !== 'en') {
      setIsTranslating(true);
      
      try {
        // Translate key sections
        const sectionsToTranslate = [
          { selector: '[data-translate]', isMultiple: true }
        ];
        
        for (const section of sectionsToTranslate) {
          if (section.isMultiple) {
            const elements = document.querySelectorAll(section.selector);
            for (let i = 0; i < elements.length; i++) {
              const element = elements[i];
              const originalText = element.getAttribute('data-original') || element.textContent;
              
              if (!element.getAttribute('data-original')) {
                element.setAttribute('data-original', originalText || '');
              }
              
              if (originalText) {
                const translatedText = await translateText(originalText, lang);
                element.textContent = translatedText;
              }
            }
          }
        }
      } catch (error) {
        console.error('Translation failed:', error);
      } finally {
        setIsTranslating(false);
      }
    } else {
      // Restore original English text
      const translatedElements = document.querySelectorAll('[data-original]');
      for (let i = 0; i < translatedElements.length; i++) {
        const element = translatedElements[i];
        const originalText = element.getAttribute('data-original');
        if (originalText) {
          element.textContent = originalText;
        }
      }
    }
  };

  // Enhanced PDF generation
  const generatePDF = async () => {
    try {
      // Extract text content from portfolio
      const portfolioContent = document.querySelector('main')?.innerText || '';
      
      // Get AI-optimized content structure
      const response = await fetch('/api/optimize-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: portfolioContent })
      });
      const data = await response.json();
      
      // Create a temporary div with optimized content for printing using safe DOM methods
      const printDiv = document.createElement('div');
      printDiv.style.fontFamily = 'Arial, sans-serif';
      printDiv.style.maxWidth = '800px';
      printDiv.style.margin = '0 auto';
      printDiv.style.padding = '20px';
      
      const heading = document.createElement('h1');
      heading.style.textAlign = 'center';
      heading.style.color = '#7c3aed';
      heading.textContent = 'Hassan Nasr - AI & Automation Architect';
      
      const contentDiv = document.createElement('div');
      contentDiv.style.whiteSpace = 'pre-wrap';
      contentDiv.style.lineHeight = '1.6';
      contentDiv.textContent = data.optimizedContent;
      
      printDiv.appendChild(heading);
      printDiv.appendChild(contentDiv);
      
      // Replace current content temporarily - store DOM nodes, not HTML strings
      const originalChildren = Array.from(document.body.childNodes);
      document.body.innerHTML = '';
      document.body.appendChild(printDiv);
      
      // Print
      window.print();
      
      // Restore original content safely using DOM nodes
      document.body.innerHTML = '';
      originalChildren.forEach(child => document.body.appendChild(child));
      
    } catch (error) {
      console.error('PDF generation error:', error);
      // Fallback to regular print
      window.print();
    }
  };
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  // 3D scroll-based transforms for background objects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const scale2 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 1.3, 1]);
  
  // Add loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);
  
  // Filter projects by category
  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  const filteredProjects = selectedCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedCategory);
    
  // Get category image
  const getCategoryImage = (category: string) => {
    switch (category) {
      case 'E-commerce': return ecommerceImg;
      case 'AI/Automation': return aiAutomationImg;
      case 'Digital Transformation': return digitalTransformImg;
      case 'Travel/Tourism': return travelTechImg;
      default: return aiAutomationImg;
    }
  };

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
    <main className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-50">
      {/* ANIMATED HERO BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10 h-[70vh] overflow-hidden">
        <Hyperspeed
          effectOptions={{
            colors: {
              roadColor: theme === 'dark' ? 0x0a0a0a : 0x1a1a1a,
              islandColor: theme === 'dark' ? 0x0c0c0c : 0x1c1c1c,
              background: theme === 'dark' ? 0x000000 : 0x0a0a0a,
              shoulderLines: theme === 'dark' ? 0x1a1a2e : 0x2a2a3e,
              brokenLines: theme === 'dark' ? 0x1a1a2e : 0x2a2a3e,
              leftCars: [0x7c3aed, 0x9333ea, 0xa855f7],
              rightCars: [0x06b6d4, 0x0ea5e9, 0x3b82f6],
              sticks: theme === 'dark' ? 0x7c3aed : 0x8b5cf6
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-black pointer-events-none" />
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
              data-translate
            >
              {PROFILE.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="mt-3 max-w-xl text-base text-gray-600 dark:text-gray-400"
              data-testid="text-hero-subtitle"
              data-translate
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
            
            {/* Floating objects around the focus card */}
            <motion.div
              style={{ y: y1, rotate: rotate1 }}
              className="absolute -top-4 -left-4 w-3 h-3 bg-violet-400/30 rounded-full"
              animate={{ 
                y: [0, -10, 0], 
                scale: [1, 1.2, 1] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div
              style={{ y: y2, rotate: rotate2 }}
              className="absolute -top-2 -right-6 w-2 h-8 bg-gradient-to-t from-blue-400/20 to-cyan-400/20 rounded-full transform rotate-12"
              animate={{ 
                rotate: [12, 32, 12],
                x: [0, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div
              style={{ y: y3, scale: scale1 }}
              className="absolute -bottom-3 -right-3 w-4 h-4 border border-fuchsia-400/30 rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div
              style={{ y: y1, rotate: rotate1 }}
              className="absolute -bottom-4 -left-2 w-6 h-1 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full"
              animate={{ 
                scaleX: [1, 1.5, 1],
                y: [0, -8, 0]
              }}
              transition={{ 
                duration: 3.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />

            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900" data-testid="card-focus">
              {/* Focus Section with Professional Headshot */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="w-48 h-48 rounded-2xl overflow-hidden mb-6">
                  <img 
                    src={professionalHeadshot} 
                    alt="Hassan Nasr - AI & Automation Architect"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-xs"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Triangle of Power</h3>
                  <div className="space-y-2 mb-6">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                      className="text-violet-600 dark:text-violet-400 font-semibold"
                    >
                      AI
                    </motion.div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.7
                      }}
                      className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold"
                    >
                      Automation
                    </motion.div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.4
                      }}
                      className="text-blue-600 dark:text-blue-400 font-semibold"
                    >
                      Product
                    </motion.div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Clean architecture, measurable ROI, delightful UX
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" title="About" subtitle="Builder at the intersection of AI, product, and automation.">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 prose prose-zinc max-w-none dark:prose-invert" data-testid="text-about-content">
            <p data-translate>
              I'm an engineer and product builder with 15+ years across web, mobile, and data systems. I help teams ship
              pragmatic AI solutions—OCR → RAG → ERP/CRM automations—that reduce manual work and unlock new revenue.
              I value clear roadmaps, crisp interfaces, and measurable outcomes.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900/20 dark:to-fuchsia-900/20 p-2">
              <img 
                src={professionalHeadshot} 
                alt="Hassan Nasr - Professional Portrait"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills" subtitle="A curated set of tools I reach for often, built from 15+ years across IT, digital, and AI projects.">
        <div className="grid gap-6 lg:grid-cols-2">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.group}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              data-testid={`card-skill-${s.group.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              <Card className="p-6 h-full">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{s.group}</h3>
                  {s.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4" data-translate>{s.description}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <Badge key={item} data-testid={`badge-skill-${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                      {item}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Skills Summary */}
        <motion.div 
          className="mt-12 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Skills & Experience Infographic */}
          <div className="mb-6 flex justify-center">
            <div className="w-full max-w-4xl rounded-lg overflow-hidden">
              <img 
                src={skillsInfographic} 
                alt="Technical Skills & Experience Overview Infographic"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Technical Expertise Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-600">50+</div>
                <div className="text-gray-600 dark:text-gray-400">AI Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15+</div>
                <div className="text-gray-600 dark:text-gray-400">Languages & Frameworks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">20+</div>
                <div className="text-gray-600 dark:text-gray-400">Business Systems</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">25+</div>
                <div className="text-gray-600 dark:text-gray-400">Creative & Marketing Tools</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Animated Tech Stack Showcase */}
        <motion.div 
          className="mt-16 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Technology Arsenal</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A curated selection of the tools and technologies I leverage to build scalable, AI-powered solutions
            </p>
          </div>

          {/* All Technologies in One Line */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Full Technology Stack</h4>
            <div className="h-16 overflow-hidden">
              <LogoLoop
                logos={[
                  // Frontend & Design
                  { node: <SiReact className="text-blue-500" />, title: "React", href: "https://react.dev" },
                  { node: <SiNextdotjs className="text-black dark:text-white" />, title: "Next.js", href: "https://nextjs.org" },
                  { node: <SiTypescript className="text-blue-600" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
                  { node: <SiJavascript className="text-yellow-500" />, title: "JavaScript" },
                  { node: <SiTailwindcss className="text-cyan-500" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
                  { node: <SiFigma className="text-purple-500" />, title: "Figma", href: "https://figma.com" },
                  
                  // Backend & Database
                  { node: <SiNodedotjs className="text-green-600" />, title: "Node.js", href: "https://nodejs.org" },
                  { node: <SiPython className="text-blue-500" />, title: "Python", href: "https://python.org" },
                  { node: <SiExpress className="text-gray-600" />, title: "Express.js" },
                  { node: <SiPostgresql className="text-blue-600" />, title: "PostgreSQL", href: "https://postgresql.org" },
                  { node: <SiMongodb className="text-green-500" />, title: "MongoDB", href: "https://mongodb.com" },
                  { node: <SiRedis className="text-red-600" />, title: "Redis" },
                  
                  // AI & Cloud Infrastructure
                  { node: <SiOpenai className="text-black dark:text-white" />, title: "OpenAI", href: "https://openai.com" },
                  { node: <span className="text-orange-500 font-bold text-lg">AWS</span>, title: "AWS", href: "https://aws.amazon.com" },
                  { node: <SiGooglecloud className="text-blue-500" />, title: "Google Cloud", href: "https://cloud.google.com" },
                  { node: <SiDocker className="text-blue-600" />, title: "Docker", href: "https://docker.com" },
                  { node: <SiKubernetes className="text-blue-700" />, title: "Kubernetes" },
                  { node: <SiGithub className="text-black dark:text-white" />, title: "GitHub", href: "https://github.com" },
                  
                  // Business & Automation
                  { node: <SiZapier className="text-orange-500" />, title: "Zapier", href: "https://zapier.com" },
                  { node: <SiHubspot className="text-orange-600" />, title: "HubSpot", href: "https://hubspot.com" },
                  { node: <SiSalesforce className="text-blue-500" />, title: "Salesforce", href: "https://salesforce.com" },
                  { node: <SiShopify className="text-green-600" />, title: "Shopify", href: "https://shopify.com" },
                  { node: <SiStripe className="text-purple-600" />, title: "Stripe", href: "https://stripe.com" },
                  { node: <SiNotion className="text-black dark:text-white" />, title: "Notion", href: "https://notion.so" },
                  { node: <SiAdobephotoshop className="text-blue-700" />, title: "Photoshop" },
                  { node: <SiCanva className="text-purple-500" />, title: "Canva", href: "https://canva.com" }
                ]}
                speed={60}
                direction="left"
                logoHeight={32}
                gap={40}
                pauseOnHover={true}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="transparent"
                ariaLabel="Complete technology stack"
              />
            </div>
          </div>
        </motion.div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title="Experience" subtitle="Recent roles and impact.">
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
          <div className="space-y-6">
            {CAREER_TIMELINE.map((exp, i) => (
              <div key={i} className="relative pl-10" data-testid={`card-experience-${i}`}>
                <div className="absolute left-0 top-2 grid h-8 w-8 place-items-center rounded-full border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-white/5 backdrop-blur">
                  <div className="h-2.5 w-2.5 rounded-full bg-violet-600" />
                </div>
                <Card className="p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white" data-testid={`text-experience-role-${i}`}>{exp.role}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400" data-testid={`text-experience-org-${i}`}>{exp.org}{exp.location ? ` • ${exp.location}` : ""}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{exp.description}</p>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400" data-testid={`text-experience-period-${i}`}>{exp.period}</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {exp.achievements.map((achievement, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                        <span data-testid={`text-experience-achievement-${i}-${j}`}>{achievement}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      {exp.tools.slice(0, 6).map((tool) => (
                        <Badge key={tool} data-testid={`badge-experience-tool-${tool.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                          {tool}
                        </Badge>
                      ))}
                      {exp.tools.length > 6 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">+{exp.tools.length - 6} more</span>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects Portfolio" subtitle="Comprehensive overview of digital transformation initiatives and technical implementations.">
        {/* View Mode Toggle */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2">
            <motion.button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Grid View
            </motion.button>
            <motion.button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                viewMode === 'timeline'
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Timeline View
            </motion.button>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid={`filter-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <motion.div 
          className="grid gap-6 lg:grid-cols-2"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => (
              <motion.div
                key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                data-testid={`card-project-${i}`}
              >
                <Card className="p-6 h-full">
                  {/* Category thumbnail */}
                  <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img 
                      src={getCategoryImage(p.category)} 
                      alt={`${p.category} illustration`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white" data-testid={`text-project-name-${i}`}>{p.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          p.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                          p.status === 'Advisory' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                      <p className="text-sm text-violet-600 dark:text-violet-400 font-medium" data-testid={`text-project-role-${i}`}>{p.role}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1" data-testid={`text-project-period-${i}`}>{p.period}</p>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded" data-testid={`text-project-category-${i}`}>{p.category}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4" data-testid={`text-project-tagline-${i}`}>{p.tagline}</p>
                  
                  <div className="space-y-2 mb-4">
                    {p.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <Badge key={s} data-testid={`badge-project-stack-${i}-${s.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>{s}</Badge>
                    ))}
                  </div>
                  
                  {p.link && (
                    <div className="mt-4 inline-flex items-center gap-1 text-sm text-violet-600 hover:underline cursor-pointer">
                      View Project <ExternalLink size={14} />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Project Stats */}
        <motion.div 
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center p-4 bg-white/60 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="text-2xl font-bold text-violet-600">{PROJECTS.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Projects</div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="text-2xl font-bold text-green-600">{PROJECTS.filter(p => p.status === 'Active').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Projects</div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="text-2xl font-bold text-blue-600">{categories.length - 1}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="text-2xl font-bold text-orange-600">6+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
          </div>
        </motion.div>
      </Section>

      {/* BRAND DESIGN PORTFOLIO */}
      <Section id="brand-design" title="Brand Design Portfolio" subtitle="Scalable brand identity systems for 40+ companies across diverse industries.">
        <div className="mb-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Developed and managed scalable brand identity systems ensuring consistency across digital, print, and marketing channels. 
              Specialized in logo creation, typography systems, brand guidelines, and cross-platform marketing assets.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-white/60 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="text-2xl font-bold text-violet-600">40+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Companies</div>
              </div>
              <div className="p-4 bg-white/60 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Industries</div>
              </div>
              <div className="p-4 bg-white/60 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="text-2xl font-bold text-green-600">AI-Enhanced</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Workflows</div>
              </div>
              <div className="p-4 bg-white/60 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="text-2xl font-bold text-orange-600">Multi-Channel</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Delivery</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          {BRAND_GROUPS.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              data-testid={`card-brand-group-${i}`}
            >
              <Card className="p-6 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2" data-testid={`text-brand-title-${i}`}>
                      {group.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3" data-testid={`text-brand-description-${i}`}>
                      {group.description}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {group.companies.length} brands
                  </span>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Featured Brands:</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.companies.map((company) => (
                      <Badge key={company} data-testid={`badge-company-${company.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Key Deliverables:</h4>
                  {group.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Tools & Technologies */}
        <motion.div 
          className="mt-12 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Placeholder for brand design tools showcase */}
          <div className="mb-6 flex justify-center">
            <div className="w-full max-w-md h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Brand Design Tools Showcase</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">Technologies & Tools</h3>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-violet-600 dark:text-violet-400 mb-2">Design & Creative</h4>
              <p className="text-gray-600 dark:text-gray-400">Adobe Photoshop, Illustrator, InDesign, After Effects, Canva Pro</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">AI & Automation</h4>
              <p className="text-gray-600 dark:text-gray-400">MidJourney, Runway, ChatGPT for content & visual concepts</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Collaboration</h4>
              <p className="text-gray-600 dark:text-gray-400">Figma (design systems), Notion, Trello, Google Workspace</p>
            </div>
            <div>
              <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Marketing Ops</h4>
              <p className="text-gray-600 dark:text-gray-400">Meta Business Suite, LinkedIn Campaign Manager, Google Ads Creative Studio</p>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" title="Education" subtitle="Academic foundation in computer science and AI.">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">🎓</div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">B.Sc. Computer Science</h3>
                    <p className="text-violet-600 dark:text-violet-400 font-medium">MTI University • Cairo, Egypt</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Comprehensive computer science program with specialization in AI and software engineering</p>
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">2005 – 2010</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Core Curriculum:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Algorithms, Data Structures, AI, Machine Learning, Databases, Cybersecurity, Software Engineering</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Technologies Learned:</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "C++", "PHP", "JavaScript", "SQL", "AI/ML fundamentals"].map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Capstone Project:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered automation & business intelligence system</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
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
                onClick={generatePDF}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold hover:bg-white/60 dark:hover:bg-white/10"
                data-testid="button-print"
              >
                <Download size={18} /> AI-Optimized PDF
              </button>
            </div>
          </Card>
        </div>
      </Section>

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setTranslationOpen(!translationOpen)}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all"
            data-testid="button-translate"
          >
            <Globe size={24} />
          </button>
          
          {translationOpen && (
            <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 min-w-[120px]">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { code: 'en', name: '🇺🇸 EN' },
                  { code: 'no', name: '🇳🇴 NO' },
                  { code: 'ar', name: '🇸🇦 AR' },
                  { code: 'sv', name: '🇸🇪 SV' }
                ].map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setTranslationOpen(false);
                    }}
                    className={`px-3 py-2 text-xs rounded transition-all ${
                      currentLanguage === lang.code 
                        ? 'bg-blue-600 text-white' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
              {isTranslating && (
                <div className="mt-2 text-xs text-center text-gray-500">
                  Translating...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chat Button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all"
          data-testid="button-chat"
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {/* CHAT MODAL */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setChatOpen(false)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md h-[500px] flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold">Chat with Hassan's AI Assistant</h3>
              <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                  Ask me anything about Hassan's experience, skills, or projects!
                </div>
              )}
              
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-violet-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  placeholder="Ask about Hassan's experience..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
                  disabled={isChatLoading}
                />
                <button
                  onClick={sendChatMessage}
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-gray-200/70 dark:border-gray-800/70 py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 text-xs text-gray-500">
          <p data-testid="text-footer-copyright">© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
          <p data-testid="text-footer-tech">Built with React • Tailwind • AI • Framer Motion</p>
        </div>
      </footer>
    </main>
  );
}
