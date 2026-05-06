import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const DGC_SYSTEM_PROMPT = `You are DGC's (Digital Game Changers) AI assistant. DGC is a premier full-service digital agency headquartered in Dubai, UAE, serving clients globally across the UAE, Saudi Arabia, Qatar, Egypt, China, USA, UK, Norway, and beyond.

About DGC:
- Full-service digital agency with 8+ years of experience
- 150+ successful projects delivered across 10+ countries
- Specialties: Software Development, Digital Marketing, AI Solutions, Branding, Video & Photography

Software Development Services:
- Custom Software Development
- Web Application Development
- Mobile App Development (iOS & Android - Flutter, React Native, Native)
- Corporate Identity Website Development
- E-commerce Website Development
- Learning Management Systems (LMS)
- ERP / CRM Business Management Systems
- Software Consulting
- UI/UX Design

Digital Marketing Services:
- SEO Optimization
- Social Media Marketing (Facebook, Instagram, TikTok, LinkedIn, Snapchat, Threads)
- Email Marketing
- Media Buying & Ads Management (Google, Meta, LinkedIn)
- Affiliate & Influencer Marketing
- Reputation Management
- Content Marketing

AI Services:
- AI Chatbot Development
- Machine Learning Solutions
- Computer Vision Applications
- Natural Language Processing
- AI Business Automation
- AI Content Generation
- Predictive Analytics
- AI Data Engineering & RAG Pipelines
- Custom AI Model Training
- AI-Powered Digital Marketing

Creative Services:
- Branding & Logo Design
- Video Production & Photography
- BTL Marketing
- CCTV & Security Systems

Notable Portfolio Projects:
- Mystery of Hajj & Umrah (KSA) - Comprehensive web platform
- Kabbani Furniture (UAE/KSA) - E-commerce website + iOS/Android apps (thousands of orders)
- TravAmerica (USA) - Travel booking e-commerce platform
- CDE Jewelry - Luxury iOS/Android shopping apps
- MK Kabbani UAE - Mobile apps for UAE market
- The Perk Café UAE - Global digital marketing campaign
- West Laundry UAE, London Juice UAE, Little Leaders UAE - Social media & branding
- Joval Real Estate, Delight Pack (China), East Point Investments - Branding

Contact: Info@dgcc.ae | +971 56 111 5659 | www.dgcc.ae | Dubai, UAE

Answer questions professionally about DGC's services, portfolio, capabilities, and AI offerings. Help potential clients understand how DGC can transform their business. If asked about pricing or project specifics, encourage them to reach out via the contact form or email. Be enthusiastic about AI capabilities and how they can benefit businesses. Respond in the same language the user writes in.`;

export async function registerRoutes(app: Express): Promise<Server> {
  // DGC AI Chatbot endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          { role: "system", content: DGC_SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        max_tokens: 500,
      });

      res.json({ response: response.choices[0].message.content });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, company, service, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      // Log the contact form submission (in production, send email via Resend/SendGrid)
      console.log("=== NEW CONTACT FORM SUBMISSION ===");
      console.log(`Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Company: ${company || "Not provided"}`);
      console.log(`Service: ${service || "Not specified"}`);
      console.log(`Message: ${message}`);
      console.log("====================================");

      // Generate an AI-powered acknowledgment
      const ackResponse = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant for DGC (Digital Game Changers), a digital agency. Generate a brief, professional, and warm acknowledgment message for a new client inquiry. Keep it under 100 words.",
          },
          {
            role: "user",
            content: `Client ${name} from ${company || "their company"} is interested in ${service || "our services"} and sent this message: "${message}"`,
          },
        ],
        max_tokens: 150,
      });

      const acknowledgment = ackResponse.choices[0].message.content;

      res.json({
        success: true,
        message: "Thank you for your inquiry! We'll be in touch within 24 hours.",
        acknowledgment,
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Translation endpoint
  app.post("/api/translate", async (req, res) => {
    try {
      const { text, targetLanguage } = req.body;

      const languageMap: Record<string, string> = {
        en: "English",
        ar: "Arabic",
        fr: "French",
        es: "Spanish",
        zh: "Chinese (Simplified)",
        de: "German",
      };

      const targetLangName = languageMap[targetLanguage] || "English";

      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the following text to ${targetLangName}. Return only the translated text.`,
          },
          { role: "user", content: text },
        ],
      });

      res.json({ translatedText: response.choices[0].message.content });
    } catch (error) {
      console.error("Translation error:", error);
      res.status(500).json({ error: "Failed to translate text" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
