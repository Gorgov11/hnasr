import React, { useState, useRef, useEffect } from "react";
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput,
  KeyboardAvoidingView, Platform, ActivityIndicator, FlatList, Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, BRAND } from "../constants/theme";

const { width } = Dimensions.get("window");

const AI_SERVICES = [
  { emoji: "🤖", title: "AI Chatbot Development", desc: "Intelligent conversational AI for customer support, lead generation, and business automation.", color: ["#0ea5e9", "#2563eb"] as [string, string] },
  { emoji: "🧠", title: "Machine Learning Solutions", desc: "Custom ML models trained on your data for predictive insights and automation.", color: ["#7c3aed", "#ec4899"] as [string, string] },
  { emoji: "👁️", title: "Computer Vision", desc: "Image recognition, object detection, and visual AI for real-world applications.", color: ["#10b981", "#0d9488"] as [string, string] },
  { emoji: "📝", title: "Natural Language Processing", desc: "Text analysis, sentiment detection, translation, and document intelligence.", color: ["#f59e0b", "#ef4444"] as [string, string] },
  { emoji: "⚡", title: "AI Business Automation", desc: "Intelligent workflows that eliminate repetitive tasks and scale operations.", color: ["#6366f1", "#8b5cf6"] as [string, string] },
  { emoji: "✨", title: "AI Content Generation", desc: "Automated content at scale using cutting-edge generative AI models.", color: ["#eab308", "#f59e0b"] as [string, string] },
  { emoji: "📈", title: "Predictive Analytics", desc: "Data-driven forecasting to anticipate trends and make smarter decisions.", color: ["#ec4899", "#f43f5e"] as [string, string] },
  { emoji: "🗄️", title: "AI Data Engineering", desc: "RAG pipelines, vector databases, and AI-ready data infrastructure.", color: ["#14b8a6", "#06b6d4"] as [string, string] },
  { emoji: "💡", title: "Custom AI Model Training", desc: "Fine-tuned models on your proprietary data for domain-specific intelligence.", color: ["#8b5cf6", "#7c3aed"] as [string, string] },
  { emoji: "🎯", title: "AI-Powered Marketing", desc: "Campaign optimization, audience targeting, and personalization at scale.", color: ["#0ea5e9", "#06b6d4"] as [string, string] },
];

type Message = { role: "user" | "assistant"; text: string };

const API_BASE = "https://your-dgc-api.dgcc.ae"; // Replace with actual deployed URL

export default function AIServicesScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi! I'm DGC's AI assistant. Ask me about our AI services, how AI can help your business, or anything about Digital Game Changers! 🤖" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.response || "Let me check that for you. Please contact us at Info@dgcc.ae for detailed information." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "I'm having connection issues right now. Please reach out to us at Info@dgcc.ae or call +971 56 111 5659 📞" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={["#0d0a1f", "#050a0f"]} style={styles.header}>
          <View style={styles.aiBadge}>
            <Text style={styles.aiBadgeText}>🧠 Artificial Intelligence</Text>
          </View>
          <Text style={styles.title}>
            AI-Powered{"\n"}
            <Text style={{ color: COLORS.violet }}>Solutions</Text>
          </Text>
          <Text style={styles.subtitle}>
            Transform your business with cutting-edge AI technologies — from chatbots to machine learning, computer vision to predictive analytics.
          </Text>
        </LinearGradient>

        {/* AI Service Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our AI Services</Text>
          {AI_SERVICES.map((ai) => (
            <LinearGradient key={ai.title} colors={ai.color} style={styles.aiCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Text style={styles.aiEmoji}>{ai.emoji}</Text>
              <View style={styles.aiContent}>
                <Text style={styles.aiTitle}>{ai.title}</Text>
                <Text style={styles.aiDesc}>{ai.desc}</Text>
              </View>
            </LinearGradient>
          ))}
        </View>

        {/* AI Chat Demo */}
        <View style={styles.chatSection}>
          <View style={styles.chatHeader}>
            <LinearGradient colors={["#7b2eff", "#00e5ff"]} style={styles.chatIcon}>
              <Text style={{ fontSize: 18 }}>🤖</Text>
            </LinearGradient>
            <View>
              <Text style={styles.chatTitle}>DGC AI Assistant</Text>
              <View style={styles.onlineRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Powered by GPT-5</Text>
              </View>
            </View>
          </View>

          {/* Messages */}
          <View style={styles.chatBox}>
            <ScrollView ref={scrollRef} style={styles.messages} showsVerticalScrollIndicator={false}>
              {messages.map((msg, i) => (
                <View key={i} style={[styles.msgRow, msg.role === "user" ? styles.msgRight : styles.msgLeft]}>
                  <LinearGradient
                    colors={msg.role === "user" ? ["#00e5ff", "#0088cc"] : ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.05)"]}
                    style={[styles.bubble, msg.role === "user" ? styles.bubbleUser : styles.bubbleAssistant]}
                  >
                    <Text style={[styles.bubbleText, msg.role === "user" && { color: "#000" }]}>
                      {msg.text}
                    </Text>
                  </LinearGradient>
                </View>
              ))}
              {loading && (
                <View style={[styles.msgRow, styles.msgLeft]}>
                  <View style={[styles.bubble, styles.bubbleAssistant, { paddingVertical: 12 }]}>
                    <ActivityIndicator color={COLORS.cyan} size="small" />
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Input */}
            <View style={styles.inputRow}>
              <TextInput
                value={input}
                onChangeText={setInput}
                onSubmitEditing={sendMessage}
                placeholder="Ask about AI services..."
                placeholderTextColor={COLORS.textMuted}
                style={styles.input}
                returnKeyType="send"
              />
              <TouchableOpacity onPress={sendMessage} disabled={loading} activeOpacity={0.8}>
                <LinearGradient
                  colors={loading ? ["#333", "#333"] : ["#7b2eff", "#00e5ff"]}
                  style={styles.sendBtn}
                >
                  <Text style={styles.sendIcon}>→</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Why AI section */}
        <View style={styles.whySection}>
          <Text style={styles.sectionTitle}>Why AI for Your Business?</Text>
          {[
            { emoji: "⚡", title: "10x Faster Operations", desc: "Automate repetitive tasks and free your team for high-value work." },
            { emoji: "🎯", title: "Smarter Decisions", desc: "Predictive analytics help you anticipate market shifts before they happen." },
            { emoji: "💰", title: "Reduce Costs", desc: "AI automation significantly reduces operational expenses over time." },
            { emoji: "🚀", title: "Competitive Advantage", desc: "Stay ahead with AI capabilities your competitors haven't adopted yet." },
          ].map((item) => (
            <View key={item.title} style={styles.whyCard}>
              <Text style={styles.whyEmoji}>{item.emoji}</Text>
              <View style={styles.whyContent}>
                <Text style={styles.whyTitle}>{item.title}</Text>
                <Text style={styles.whyDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 24, paddingTop: 16 },
  aiBadge: { backgroundColor: "#7b2eff20", borderWidth: 1, borderColor: "#7b2eff40", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, alignSelf: "flex-start", marginBottom: 12 },
  aiBadgeText: { color: COLORS.violet, fontSize: 12, fontWeight: "600" },
  title: { color: "#fff", fontSize: 28, fontWeight: "900", lineHeight: 36, marginBottom: 10 },
  subtitle: { color: COLORS.textSecondary, fontSize: 14, lineHeight: 22 },
  section: { padding: 16, gap: 10 },
  sectionTitle: { color: "#fff", fontSize: 20, fontWeight: "800", marginBottom: 12 },
  aiCard: { flexDirection: "row", borderRadius: 14, padding: 16, alignItems: "flex-start", gap: 14 },
  aiEmoji: { fontSize: 26, marginTop: 2 },
  aiContent: { flex: 1 },
  aiTitle: { color: "#fff", fontSize: 14, fontWeight: "700", marginBottom: 4 },
  aiDesc: { color: "rgba(255,255,255,0.75)", fontSize: 12, lineHeight: 18 },
  chatSection: { margin: 16, backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: "#7b2eff30", borderRadius: 20, overflow: "hidden" },
  chatHeader: { flexDirection: "row", gap: 12, padding: 14, backgroundColor: "rgba(123,46,255,0.15)", borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.06)", alignItems: "center" },
  chatIcon: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  chatTitle: { color: "#fff", fontWeight: "700", fontSize: 14 },
  onlineRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 },
  onlineDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: "#10b981" },
  onlineText: { color: "#10b981", fontSize: 11 },
  chatBox: { backgroundColor: "#030508" },
  messages: { height: 240, padding: 12 },
  msgRow: { marginBottom: 10 },
  msgLeft: { alignItems: "flex-start" },
  msgRight: { alignItems: "flex-end" },
  bubble: { maxWidth: "85%", borderRadius: 14, padding: 12 },
  bubbleUser: { borderBottomRightRadius: 4 },
  bubbleAssistant: { borderBottomLeftRadius: 4 },
  bubbleText: { color: "#fff", fontSize: 13, lineHeight: 19 },
  inputRow: { flexDirection: "row", gap: 8, padding: 10, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.06)" },
  input: { flex: 1, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, color: "#fff", fontSize: 13 },
  sendBtn: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  sendIcon: { color: "#fff", fontWeight: "900", fontSize: 18 },
  whySection: { padding: 16 },
  whyCard: { flexDirection: "row", gap: 14, backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)" },
  whyEmoji: { fontSize: 28, marginTop: 2 },
  whyContent: { flex: 1 },
  whyTitle: { color: "#fff", fontWeight: "700", fontSize: 14, marginBottom: 4 },
  whyDesc: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 18 },
});
