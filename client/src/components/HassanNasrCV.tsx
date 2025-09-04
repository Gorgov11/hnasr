import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Download, Sun, Moon, ExternalLink, Phone, Menu, X } from "lucide-react";
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
import professionalHeadshot from "@assets/generated_images/Professional_headshot_placeholder_e18e2847.png";

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
    <main className="relative min-h-screen bg-gradient-to-b from-violet-50 via-white to-white dark:from-black dark:via-zinc-950 dark:to-black text-gray-900 dark:text-gray-50">
      {/* ANIMATED HERO BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10 h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/60 to-white dark:from-black/30 dark:via-black/60 dark:to-black" />
      </div>

      {/* 3D SCROLL-BASED ANIMATED OBJECTS */}
      <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <motion.div
          style={{ y: y1, rotate: rotate1, scale: scale1 }}
          className="absolute top-20 left-10 w-8 h-8 border-2 border-violet-300/30 dark:border-violet-500/30 transform rotate-45"
        />
        <motion.div
          style={{ y: y2, rotate: rotate2 }}
          className="absolute top-40 right-20 w-6 h-6 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full"
        />
        <motion.div
          style={{ y: y3, scale: scale2 }}
          className="absolute top-80 left-1/4 w-4 h-16 bg-gradient-to-t from-purple-400/20 to-pink-400/20 rounded-full transform -rotate-12"
        />
        <motion.div
          style={{ y: y1, rotate: rotate1 }}
          className="absolute top-96 right-1/3 w-10 h-10 border border-fuchsia-300/30 dark:border-fuchsia-500/30 rounded-full"
        />
        <motion.div
          style={{ y: y2, rotate: rotate2, scale: scale1 }}
          className="absolute top-[60vh] left-12 w-12 h-2 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full"
        />
        <motion.div
          style={{ y: y3, rotate: rotate1 }}
          className="absolute top-[80vh] right-16 w-6 h-6 border-2 border-orange-300/30 dark:border-orange-500/30 transform rotate-12"
        />
        <motion.div
          style={{ y: y1, scale: scale2 }}
          className="absolute top-[100vh] left-1/3 w-8 h-8 bg-gradient-to-bl from-indigo-400/20 to-purple-400/20 rounded-full"
        />
        <motion.div
          style={{ y: y2, rotate: rotate2 }}
          className="absolute top-[120vh] right-10 w-14 h-1 bg-gradient-to-r from-rose-400/20 to-pink-400/20 rounded-full transform rotate-45"
        />
        <motion.div
          style={{ y: y3, rotate: rotate1, scale: scale1 }}
          className="absolute top-[140vh] left-20 w-5 h-12 bg-gradient-to-t from-yellow-400/20 to-amber-400/20 rounded-full transform -rotate-30"
        />
        <motion.div
          style={{ y: y1, rotate: rotate2 }}
          className="absolute top-[160vh] right-1/4 w-7 h-7 border border-cyan-300/30 dark:border-cyan-500/30 rounded-full transform rotate-45"
        />
        
        {/* AI-themed floating icons */}
        <motion.div
          style={{ y: y2, rotate: rotate1, scale: scale2 }}
          className="absolute top-[50vh] right-8 text-violet-400/30 dark:text-violet-500/30 text-2xl"
        >
          🤖
        </motion.div>
        <motion.div
          style={{ y: y3, rotate: rotate2 }}
          className="absolute top-[90vh] left-8 text-blue-400/30 dark:text-blue-500/30 text-xl"
        >
          ⚡
        </motion.div>
        <motion.div
          style={{ y: y1, scale: scale1 }}
          className="absolute top-[130vh] right-12 text-purple-400/30 dark:text-purple-500/30 text-2xl"
        >
          🎯
        </motion.div>
        <motion.div
          style={{ y: y2, rotate: rotate1 }}
          className="absolute top-[170vh] left-16 text-emerald-400/30 dark:text-emerald-500/30 text-xl"
        >
          🚀
        </motion.div>
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

            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-black" data-testid="card-focus">
              {/* Hyperspeed Background */}
              <Hyperspeed 
                effectOptions={{
                  colors: {
                    roadColor: 0x080808,
                    islandColor: 0x0a0a0a,
                    background: 0x000000,
                    shoulderLines: 0x131318,
                    brokenLines: 0x131318,
                    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
                    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
                    sticks: 0x03b3c3
                  }
                }}
              />
              
              {/* Centered Text Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 bg-black/20 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-xs"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">Triangle of Power</h3>
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
                      className="text-violet-400 font-semibold"
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
                      className="text-fuchsia-400 font-semibold"
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
                      className="text-blue-400 font-semibold"
                    >
                      Product
                    </motion.div>
                  </div>
                  <p className="text-gray-300 text-sm">
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
            <p>
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
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{s.description}</p>
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
          className="mt-12 p-6 bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 rounded-2xl border border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
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

          {/* Frontend & Design */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-violet-600 dark:text-violet-400 text-center">Frontend & Design</h4>
            <div className="h-16 overflow-hidden">
              <LogoLoop
                logos={[
                  { node: <SiReact className="text-blue-500" />, title: "React", href: "https://react.dev" },
                  { node: <SiNextdotjs className="text-black dark:text-white" />, title: "Next.js", href: "https://nextjs.org" },
                  { node: <SiTypescript className="text-blue-600" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
                  { node: <SiJavascript className="text-yellow-500" />, title: "JavaScript" },
                  { node: <SiTailwindcss className="text-cyan-500" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
                  { node: <SiBootstrap className="text-purple-600" />, title: "Bootstrap" },
                  { node: <SiHtml5 className="text-orange-600" />, title: "HTML5" },
                  { node: <SiCss3 className="text-blue-500" />, title: "CSS3" },
                  { node: <SiVuedotjs className="text-green-500" />, title: "Vue.js" },
                  { node: <SiAngular className="text-red-600" />, title: "Angular" },
                  { node: <SiFigma className="text-purple-500" />, title: "Figma", href: "https://figma.com" },
                  { node: <SiFramer className="text-black dark:text-white" />, title: "Framer" }
                ]}
                speed={60}
                direction="left"
                logoHeight={32}
                gap={40}
                pauseOnHover={true}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="transparent"
                ariaLabel="Frontend and design technologies"
              />
            </div>
          </div>

          {/* Backend & Database */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 text-center">Backend & Database</h4>
            <div className="h-16 overflow-hidden">
              <LogoLoop
                logos={[
                  { node: <SiNodedotjs className="text-green-600" />, title: "Node.js", href: "https://nodejs.org" },
                  { node: <SiPython className="text-blue-500" />, title: "Python", href: "https://python.org" },
                  { node: <SiExpress className="text-gray-600" />, title: "Express.js" },
                  { node: <SiFlask className="text-gray-800 dark:text-white" />, title: "Flask" },
                  { node: <SiDjango className="text-green-700" />, title: "Django" },
                  { node: <SiPostgresql className="text-blue-600" />, title: "PostgreSQL", href: "https://postgresql.org" },
                  { node: <SiMongodb className="text-green-500" />, title: "MongoDB", href: "https://mongodb.com" },
                  { node: <SiMysql className="text-orange-600" />, title: "MySQL" },
                  { node: <SiRedis className="text-red-600" />, title: "Redis" },
                  { node: <SiElasticsearch className="text-yellow-600" />, title: "Elasticsearch" }
                ]}
                speed={50}
                direction="right"
                logoHeight={32}
                gap={40}
                pauseOnHover={true}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="transparent"
                ariaLabel="Backend and database technologies"
              />
            </div>
          </div>

          {/* AI & Cloud Infrastructure */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 text-center">AI & Cloud Infrastructure</h4>
            <div className="h-16 overflow-hidden">
              <LogoLoop
                logos={[
                  { node: <SiOpenai className="text-black dark:text-white" />, title: "OpenAI", href: "https://openai.com" },
                  { node: <span className="text-orange-500 font-bold text-lg">AWS</span>, title: "AWS", href: "https://aws.amazon.com" },
                  { node: <SiGooglecloud className="text-blue-500" />, title: "Google Cloud", href: "https://cloud.google.com" },
                  { node: <SiDocker className="text-blue-600" />, title: "Docker", href: "https://docker.com" },
                  { node: <SiKubernetes className="text-blue-700" />, title: "Kubernetes" },
                  { node: <SiTerraform className="text-purple-600" />, title: "Terraform" },
                  { node: <SiJenkins className="text-blue-800" />, title: "Jenkins" },
                  { node: <SiGit className="text-orange-600" />, title: "Git" },
                  { node: <SiGithub className="text-black dark:text-white" />, title: "GitHub", href: "https://github.com" },
                  { node: <SiGitlab className="text-orange-600" />, title: "GitLab" },
                  { node: <SiVercel className="text-black dark:text-white" />, title: "Vercel", href: "https://vercel.com" },
                  { node: <SiNetlify className="text-teal-500" />, title: "Netlify", href: "https://netlify.com" }
                ]}
                speed={70}
                direction="left"
                logoHeight={32}
                gap={40}
                pauseOnHover={true}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="transparent"
                ariaLabel="AI and cloud infrastructure technologies"
              />
            </div>
          </div>

          {/* Business & Automation Tools */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-fuchsia-600 dark:text-fuchsia-400 text-center">Business & Automation</h4>
            <div className="h-16 overflow-hidden">
              <LogoLoop
                logos={[
                  { node: <SiZapier className="text-orange-500" />, title: "Zapier", href: "https://zapier.com" },
                  { node: <SiHubspot className="text-orange-600" />, title: "HubSpot", href: "https://hubspot.com" },
                  { node: <SiSalesforce className="text-blue-500" />, title: "Salesforce", href: "https://salesforce.com" },
                  { node: <SiShopify className="text-green-600" />, title: "Shopify", href: "https://shopify.com" },
                  { node: <SiWordpress className="text-blue-700" />, title: "WordPress", href: "https://wordpress.org" },
                  { node: <SiStripe className="text-purple-600" />, title: "Stripe", href: "https://stripe.com" },
                  { node: <SiPaypal className="text-blue-600" />, title: "PayPal", href: "https://paypal.com" },
                  { node: <SiNotion className="text-black dark:text-white" />, title: "Notion", href: "https://notion.so" },
                  { node: <SiSlack className="text-purple-600" />, title: "Slack", href: "https://slack.com" },
                  { node: <SiAdobephotoshop className="text-blue-700" />, title: "Photoshop" },
                  { node: <SiAdobeillustrator className="text-orange-600" />, title: "Illustrator" },
                  { node: <SiCanva className="text-purple-500" />, title: "Canva", href: "https://canva.com" }
                ]}
                speed={55}
                direction="right"
                logoHeight={32}
                gap={40}
                pauseOnHover={true}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="transparent"
                ariaLabel="Business and automation tools"
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
          className="mt-12 p-6 bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 rounded-2xl border border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
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
