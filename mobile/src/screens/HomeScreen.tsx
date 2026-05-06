import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Linking,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, BRAND } from "../constants/theme";

const { width, height } = Dimensions.get("window");

const STATS = [
  { value: "150+", label: "Projects" },
  { value: "10+", label: "Countries" },
  { value: "98%", label: "Satisfaction" },
  { value: "8+", label: "Years" },
];

const SERVICES = [
  { emoji: "💻", title: "Software Dev", desc: "Custom web & mobile applications" },
  { emoji: "📱", title: "Mobile Apps", desc: "iOS & Android with Flutter/React Native" },
  { emoji: "🛒", title: "E-commerce", desc: "Online stores that convert" },
  { emoji: "📈", title: "Digital Marketing", desc: "SEO, Social Media & Paid Ads" },
  { emoji: "🤖", title: "AI Solutions", desc: "Chatbots, ML & automation" },
  { emoji: "🎨", title: "Branding", desc: "Logos & visual identity design" },
  { emoji: "🎬", title: "Video & Photo", desc: "Professional content production" },
  { emoji: "🏢", title: "ERP / CRM", desc: "Business management systems" },
];

const AI_SERVICES = [
  { emoji: "🤖", title: "AI Chatbots", color: ["#0ea5e9", "#2563eb"] as [string, string] },
  { emoji: "🧠", title: "Machine Learning", color: ["#7c3aed", "#ec4899"] as [string, string] },
  { emoji: "👁️", title: "Computer Vision", color: ["#10b981", "#0d9488"] as [string, string] },
  { emoji: "📝", title: "NLP Solutions", color: ["#f59e0b", "#ef4444"] as [string, string] },
  { emoji: "⚡", title: "AI Automation", color: ["#6366f1", "#8b5cf6"] as [string, string] },
  { emoji: "✨", title: "AI Content Gen", color: ["#eab308", "#f59e0b"] as [string, string] },
];

const PORTFOLIO = [
  { title: "Kabbani Furniture", category: "E-commerce + Mobile App", region: "UAE/KSA", color: ["#7c3aed", "#4f46e5"] as [string, string] },
  { title: "Mystery of Hajj & Umrah", category: "Web Development", region: "KSA", color: ["#10b981", "#0d9488"] as [string, string] },
  { title: "TravAmerica", category: "Travel E-commerce", region: "USA", color: ["#2563eb", "#1e40af"] as [string, string] },
  { title: "The Perk Café", category: "Digital Marketing", region: "UAE", color: ["#0ea5e9", "#0284c7"] as [string, string] },
  { title: "CDE Jewelry", category: "Mobile App", region: "International", color: ["#d97706", "#b45309"] as [string, string] },
  { title: "Delight Pack", category: "Branding", region: "China", color: ["#7c3aed", "#6d28d9"] as [string, string] },
];

function StatCard({ value, label }: { value: string; label: string }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);
  return (
    <Animated.View style={[styles.statCard, { opacity: fadeAnim }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );
}

export default function HomeScreen({ navigation }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* ── HERO ── */}
      <LinearGradient
        colors={["#050a0f", "#0a1628", "#050a0f"]}
        style={styles.hero}
      >
        {/* Glow effects */}
        <View style={styles.glowTopLeft} />
        <View style={styles.glowBottomRight} />

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], alignItems: "center" }}>
          {/* Badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✨ Now with AI-Powered Solutions</Text>
          </View>

          {/* Logo */}
          <LinearGradient
            colors={["#00e5ff", "#0088cc", "#7b2eff"]}
            style={styles.logoCircle}
          >
            <Text style={styles.logoText}>DGC</Text>
          </LinearGradient>

          <Text style={styles.heroSubtitle}>Digital Game Changers</Text>
          <Text style={styles.heroTitle}>{BRAND.tagline}</Text>
          <Text style={styles.heroDesc}>
            From AI-powered software to immersive branding — we build, grow, and transform businesses globally.
          </Text>

          {/* CTA buttons */}
          <View style={styles.ctaRow}>
            <TouchableOpacity onPress={() => navigation.navigate("Services")} activeOpacity={0.8}>
              <LinearGradient colors={["#00e5ff", "#0088cc"]} style={styles.ctaPrimary}>
                <Text style={styles.ctaPrimaryText}>Explore Services →</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Portfolio")} style={styles.ctaSecondary} activeOpacity={0.8}>
              <Text style={styles.ctaSecondaryText}>View Portfolio</Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            {STATS.map((s) => <StatCard key={s.label} {...s} />)}
          </View>
        </Animated.View>
      </LinearGradient>

      {/* ── ABOUT ── */}
      <View style={styles.section}>
        <Text style={styles.sectionAccent}>WHO WE ARE</Text>
        <Text style={styles.sectionTitle}>Global Digital Agency</Text>
        <Text style={styles.sectionDesc}>
          DGC is a premier full-service digital agency headquartered in Dubai, UAE. We transform businesses through technology, creativity, and AI — connecting you globally with solutions that drive real growth.
        </Text>

        {/* Values */}
        <View style={styles.valuesRow}>
          {["Integrity", "Innovation", "Excellence", "Partnership"].map((v) => (
            <View key={v} style={styles.valueChip}>
              <Text style={styles.valueText}>✓ {v}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── SERVICES ── */}
      <View style={[styles.section, styles.sectionDark]}>
        <Text style={styles.sectionAccent}>WHAT WE DO</Text>
        <Text style={styles.sectionTitle}>End-to-End Digital Services</Text>
        <View style={styles.servicesGrid}>
          {SERVICES.map((svc) => (
            <TouchableOpacity
              key={svc.title}
              style={styles.serviceCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Services")}
            >
              <Text style={styles.serviceEmoji}>{svc.emoji}</Text>
              <Text style={styles.serviceTitle}>{svc.title}</Text>
              <Text style={styles.serviceDesc}>{svc.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Services")} style={styles.seeAllBtn} activeOpacity={0.8}>
          <Text style={styles.seeAllText}>See All Services →</Text>
        </TouchableOpacity>
      </View>

      {/* ── AI SERVICES ── */}
      <LinearGradient colors={["#050a0f", "#0d0a1f", "#050a0f"]} style={styles.section}>
        <View style={styles.aiBadge}>
          <Text style={styles.aiBadgeText}>🧠 Artificial Intelligence</Text>
        </View>
        <Text style={styles.sectionTitle}>
          AI-Powered{" "}
          <Text style={{ color: COLORS.violet }}>Solutions</Text>
        </Text>
        <Text style={styles.sectionDesc}>
          Harness the power of AI to automate, innovate, and gain a decisive competitive edge in your market.
        </Text>
        <View style={styles.aiGrid}>
          {AI_SERVICES.map((ai) => (
            <TouchableOpacity
              key={ai.title}
              onPress={() => navigation.navigate("AIServices")}
              activeOpacity={0.8}
            >
              <LinearGradient colors={ai.color} style={styles.aiCard}>
                <Text style={styles.aiEmoji}>{ai.emoji}</Text>
                <Text style={styles.aiTitle}>{ai.title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("AIServices")}
          activeOpacity={0.8}
        >
          <LinearGradient colors={["#7b2eff", "#00e5ff"]} style={styles.aiCta}>
            <Text style={styles.aiCtaText}>Explore AI Services →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>

      {/* ── PORTFOLIO ── */}
      <View style={[styles.section, styles.sectionDark]}>
        <Text style={styles.sectionAccent}>OUR WORK</Text>
        <Text style={styles.sectionTitle}>Portfolio of Success</Text>
        {PORTFOLIO.map((project) => (
          <TouchableOpacity
            key={project.title}
            onPress={() => navigation.navigate("Portfolio")}
            activeOpacity={0.85}
          >
            <LinearGradient colors={project.color} style={styles.portfolioCard}>
              <View>
                <Text style={styles.portfolioCategory}>{project.category}</Text>
                <Text style={styles.portfolioTitle}>{project.title}</Text>
              </View>
              <View style={styles.portfolioRegion}>
                <Text style={styles.portfolioRegionText}>{project.region}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => navigation.navigate("Portfolio")} style={styles.seeAllBtn} activeOpacity={0.8}>
          <Text style={styles.seeAllText}>View Full Portfolio →</Text>
        </TouchableOpacity>
      </View>

      {/* ── CONTACT CTA ── */}
      <LinearGradient colors={["#00e5ff20", "#7b2eff20"]} style={styles.contactCta}>
        <Text style={styles.ctaHeadline}>Ready to Transform Your Business?</Text>
        <Text style={styles.ctaSubline}>Get in touch and let's build something extraordinary together.</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Contact")} activeOpacity={0.8}>
          <LinearGradient colors={["#00e5ff", "#0088cc"]} style={styles.ctaPrimary}>
            <Text style={styles.ctaPrimaryText}>Start Your Project →</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.contactInfo}>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${BRAND.email}`)}>
            <Text style={styles.contactLink}>📧 {BRAND.email}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${BRAND.phone.replace(/\s/g, "")}`)}>
            <Text style={styles.contactLink}>📞 {BRAND.phone}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerBrand}>DGC — Digital Game Changers</Text>
        <Text style={styles.footerText}>Dubai, United Arab Emirates</Text>
        <Text style={styles.footerText}>© 2024 All rights reserved</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  // Hero
  hero: { paddingTop: 60, paddingBottom: 48, paddingHorizontal: 20, position: "relative", overflow: "hidden" },
  glowTopLeft: { position: "absolute", top: 0, left: 0, width: 300, height: 300, borderRadius: 150, backgroundColor: "#00e5ff15" },
  glowBottomRight: { position: "absolute", bottom: 0, right: 0, width: 250, height: 250, borderRadius: 125, backgroundColor: "#7b2eff10" },
  badge: { backgroundColor: "#00e5ff15", borderWidth: 1, borderColor: "#00e5ff40", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginBottom: 20 },
  badgeText: { color: COLORS.cyan, fontSize: 12, fontWeight: "600" },
  logoCircle: { width: 80, height: 80, borderRadius: 20, alignItems: "center", justifyContent: "center", marginBottom: 12, shadowColor: "#00e5ff", shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 },
  logoText: { color: "#fff", fontSize: 24, fontWeight: "900", letterSpacing: 1 },
  heroSubtitle: { color: COLORS.textSecondary, fontSize: 14, marginBottom: 8 },
  heroTitle: { color: COLORS.white, fontSize: 26, fontWeight: "900", textAlign: "center", lineHeight: 34, marginBottom: 12 },
  heroDesc: { color: COLORS.textSecondary, fontSize: 14, textAlign: "center", lineHeight: 22, marginBottom: 24 },

  // CTA
  ctaRow: { flexDirection: "row", gap: 12, marginBottom: 28 },
  ctaPrimary: { paddingHorizontal: 22, paddingVertical: 14, borderRadius: 12 },
  ctaPrimaryText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  ctaSecondary: { paddingHorizontal: 22, paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: "#00e5ff40" },
  ctaSecondaryText: { color: COLORS.cyan, fontWeight: "700", fontSize: 14 },

  // Stats
  statsRow: { flexDirection: "row", gap: 10, flexWrap: "wrap", justifyContent: "center" },
  statCard: { backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, alignItems: "center", minWidth: 70 },
  statValue: { color: COLORS.cyan, fontSize: 22, fontWeight: "900" },
  statLabel: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },

  // Sections
  section: { padding: 24 },
  sectionDark: { backgroundColor: COLORS.backgroundSecondary },
  sectionAccent: { color: COLORS.cyan, fontSize: 11, fontWeight: "700", letterSpacing: 3, marginBottom: 8 },
  sectionTitle: { color: COLORS.white, fontSize: 26, fontWeight: "900", marginBottom: 12, lineHeight: 34 },
  sectionDesc: { color: COLORS.textSecondary, fontSize: 14, lineHeight: 22, marginBottom: 20 },

  // Values
  valuesRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  valueChip: { backgroundColor: "#00e5ff10", borderWidth: 1, borderColor: "#00e5ff25", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  valueText: { color: COLORS.white, fontSize: 13, fontWeight: "600" },

  // Services
  servicesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  serviceCard: { backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 14, width: (width - 58) / 2 },
  serviceEmoji: { fontSize: 24, marginBottom: 8 },
  serviceTitle: { color: COLORS.white, fontSize: 13, fontWeight: "700", marginBottom: 4 },
  serviceDesc: { color: COLORS.textMuted, fontSize: 11, lineHeight: 16 },
  seeAllBtn: { alignSelf: "center", paddingVertical: 12, paddingHorizontal: 20, backgroundColor: "rgba(0,229,255,0.08)", borderRadius: 10, borderWidth: 1, borderColor: "#00e5ff30" },
  seeAllText: { color: COLORS.cyan, fontWeight: "700", fontSize: 13 },

  // AI
  aiBadge: { backgroundColor: "#7b2eff15", borderWidth: 1, borderColor: "#7b2eff40", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginBottom: 16, alignSelf: "flex-start" },
  aiBadgeText: { color: COLORS.violet, fontSize: 12, fontWeight: "600" },
  aiGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 20 },
  aiCard: { width: (width - 58) / 2, borderRadius: 14, padding: 16, alignItems: "center" },
  aiEmoji: { fontSize: 28, marginBottom: 8 },
  aiTitle: { color: "#fff", fontSize: 12, fontWeight: "700", textAlign: "center" },
  aiCta: { borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  aiCtaText: { color: "#fff", fontWeight: "700", fontSize: 14 },

  // Portfolio
  portfolioCard: { borderRadius: 16, padding: 20, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  portfolioCategory: { color: "rgba(255,255,255,0.7)", fontSize: 11, marginBottom: 4 },
  portfolioTitle: { color: "#fff", fontSize: 16, fontWeight: "800" },
  portfolioRegion: { backgroundColor: "rgba(0,0,0,0.25)", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  portfolioRegionText: { color: "#fff", fontSize: 11, fontWeight: "600" },

  // Contact CTA
  contactCta: { margin: 16, borderRadius: 20, padding: 28, alignItems: "center", borderWidth: 1, borderColor: "#00e5ff20" },
  ctaHeadline: { color: COLORS.white, fontSize: 22, fontWeight: "900", textAlign: "center", marginBottom: 8 },
  ctaSubline: { color: COLORS.textSecondary, fontSize: 13, textAlign: "center", marginBottom: 20, lineHeight: 20 },
  contactInfo: { marginTop: 16, gap: 8, alignItems: "center" },
  contactLink: { color: COLORS.cyan, fontSize: 13, fontWeight: "600" },

  // Footer
  footer: { padding: 28, alignItems: "center", borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)" },
  footerBrand: { color: COLORS.white, fontWeight: "800", fontSize: 14, marginBottom: 4 },
  footerText: { color: COLORS.textMuted, fontSize: 12, marginBottom: 2 },
});
