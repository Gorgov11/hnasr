import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
let openai: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set");
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Chatbot endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      const response = await getOpenAI().chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: `You are Hassan Nasr's AI assistant for his professional portfolio. Hassan is an AI & Automation Architect and Full-Stack Engineer with 15+ years of experience. Key facts about Hassan:

- AI & Automation Architect specializing in OCR → RAG → ERP/CRM automations
- 15+ years experience across web, mobile, and data systems
- Expert in React, Next.js, TypeScript, Python, Node.js
- Experience with AWS, Google Cloud, OpenAI, and modern tech stack
- Brand design portfolio with 40+ companies
- B.Sc. Computer Science from MTI University, Cairo (2005-2010)
- Currently available for new opportunities
- Based in Egypt, open to remote work
- Email: hassan@example.com (placeholder)

Answer questions about Hassan's background, skills, experience, and projects. Be professional, helpful, and accurate. If asked about specific details not provided, suggest they contact Hassan directly.`
          },
          {
            role: "user",
            content: message
          }
        ],
      });

      res.json({ response: response.choices[0].message.content });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Translation endpoint
  app.post("/api/translate", async (req, res) => {
    try {
      const { text, targetLanguage } = req.body;
      
      const languageMap: Record<string, string> = {
        'en': 'English',
        'no': 'Norwegian',
        'ar': 'Arabic', 
        'sv': 'Swedish'
      };

      const targetLangName = languageMap[targetLanguage] || 'English';

      const response = await getOpenAI().chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the following text to ${targetLangName}. Maintain the professional tone and technical accuracy. For Arabic, use Modern Standard Arabic. Return only the translated text without explanations.`
          },
          {
            role: "user",
            content: text
          }
        ],
      });

      res.json({ translatedText: response.choices[0].message.content });
    } catch (error) {
      console.error("Translation error:", error);
      res.status(500).json({ error: "Failed to translate text" });
    }
  });

  // PDF optimization endpoint
  app.post("/api/optimize-pdf", async (req, res) => {
    try {
      const { content } = req.body;

      const response = await getOpenAI().chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: "You are an expert at structuring content for AI readability and professional PDF generation. Optimize the provided portfolio content with clear headings, bullet points, and structured sections that are easy for both humans and AI systems to parse. Maintain all important information while improving organization and clarity."
          },
          {
            role: "user",
            content: `Please optimize this portfolio content for PDF generation: ${content}`
          }
        ],
      });

      res.json({ optimizedContent: response.choices[0].message.content });
    } catch (error) {
      console.error("PDF optimization error:", error);
      res.status(500).json({ error: "Failed to optimize content for PDF" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
