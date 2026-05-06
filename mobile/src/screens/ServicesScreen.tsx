import React, { useState } from "react";
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/theme";

const { width } = Dimensions.get("window");

const TABS = ["Software", "Marketing", "Creative"];

const SOFTWARE = [
  { emoji: "💻", title: "Custom Software Development", desc: "Tailor-made software built around your unique business requirements and goals." },
  { emoji: "🌐", title: "Web Application Development", desc: "Scalable, high-performance web apps for businesses of all sizes." },
  { emoji: "📱", title: "Mobile App Development", desc: "iOS & Android apps using Flutter, React Native, and Native technologies." },
  { emoji: "🖥️", title: "Corporate Identity Websites", desc: "Brand-driven websites that powerfully reflect your company's identity." },
  { emoji: "🛒", title: "E-commerce Development", desc: "Secure, conversion-optimized online stores with seamless UX." },
  { emoji: "🎓", title: "LMS Development", desc: "Custom Learning Management Systems for education and enterprises." },
  { emoji: "📊", title: "ERP / CRM Systems", desc: "Business management systems that streamline operations and boost productivity." },
  { emoji: "🎨", title: "UI/UX Design", desc: "Human-centered design delivering exceptional experiences across all platforms." },
];

const MARKETING = [
  { emoji: "🔍", title: "SEO Optimization", desc: "Drive organic traffic with data-driven search engine optimization." },
  { emoji: "📲", title: "Social Media Marketing", desc: "Engaging campaigns on Facebook, Instagram, TikTok, LinkedIn & more." },
  { emoji: "📧", title: "Email Marketing", desc: "Targeted campaigns that nurture leads and drive conversions." },
  { emoji: "🎯", title: "Media Buying & Ads", desc: "ROI-focused paid advertising on Google, Meta, LinkedIn & all major platforms." },
  { emoji: "🌟", title: "Influencer Marketing", desc: "Strategic partnerships to amplify your brand authentically." },
  { emoji: "📈", title: "Affiliate Marketing", desc: "Performance-driven programs to expand reach and revenue." },
  { emoji: "⭐", title: "Reputation Management", desc: "Monitor and enhance your brand's online reputation across all channels." },
  { emoji: "📝", title: "Content Marketing", desc: "Compelling strategies that attract, engage, and convert your audience." },
];

const CREATIVE = [
  { emoji: "🎨", title: "Branding & Logo Design", desc: "Memorable brand identities that resonate with your target audience." },
  { emoji: "🎬", title: "Video Production", desc: "Professional video content from concept to final delivery." },
  { emoji: "📸", title: "Photography", desc: "360° photography and professional shoots for all your needs." },
  { emoji: "📢", title: "BTL Marketing", desc: "Targeted below-the-line campaigns hitting specific audience segments." },
  { emoji: "🎓", title: "LMS Platforms", desc: "Complete online education hubs for classroom and distance learning." },
  { emoji: "📡", title: "CCTV & Security", desc: "Advanced surveillance and security infrastructure for your business." },
];

const ALL_DATA = [SOFTWARE, MARKETING, CREATIVE];

export default function ServicesScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={["#080d14", "#050a0f"]} style={styles.header}>
        <Text style={styles.accent}>WHAT WE DO</Text>
        <Text style={styles.title}>End-to-End Digital Services</Text>
        <Text style={styles.subtitle}>
          From code to campaigns, design to deployment — we cover every dimension of your digital journey.
        </Text>
      </LinearGradient>

      {/* Tab selector */}
      <View style={styles.tabBar}>
        {TABS.map((tab, i) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(i)}
            style={[styles.tab, activeTab === i && styles.tabActive]}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Services list */}
      <View style={styles.servicesList}>
        {ALL_DATA[activeTab].map((svc) => (
          <View key={svc.title} style={styles.serviceItem}>
            <Text style={styles.serviceEmoji}>{svc.emoji}</Text>
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>{svc.title}</Text>
              <Text style={styles.serviceDesc}>{svc.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Contact CTA */}
      <View style={styles.cta}>
        <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
        <Text style={styles.ctaDesc}>Tell us about your project and we'll deliver the perfect solution.</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Contact")} activeOpacity={0.8}>
          <LinearGradient colors={["#00e5ff", "#0088cc"]} style={styles.ctaBtn}>
            <Text style={styles.ctaBtnText}>Contact Us →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 24, paddingTop: 16 },
  accent: { color: COLORS.cyan, fontSize: 11, fontWeight: "700", letterSpacing: 3, marginBottom: 8 },
  title: { color: "#fff", fontSize: 26, fontWeight: "900", marginBottom: 10, lineHeight: 34 },
  subtitle: { color: COLORS.textSecondary, fontSize: 14, lineHeight: 22 },
  tabBar: { flexDirection: "row", marginHorizontal: 16, marginTop: 16, gap: 8 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", alignItems: "center" },
  tabActive: { backgroundColor: COLORS.cyan, borderColor: COLORS.cyan },
  tabText: { color: COLORS.textSecondary, fontWeight: "600", fontSize: 12 },
  tabTextActive: { color: "#000" },
  servicesList: { padding: 16, gap: 12 },
  serviceItem: { flexDirection: "row", gap: 14, backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 16 },
  serviceEmoji: { fontSize: 28, marginTop: 2 },
  serviceContent: { flex: 1 },
  serviceTitle: { color: "#fff", fontSize: 14, fontWeight: "700", marginBottom: 4 },
  serviceDesc: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 19 },
  cta: { margin: 16, backgroundColor: "rgba(0,229,255,0.06)", borderWidth: 1, borderColor: "#00e5ff20", borderRadius: 16, padding: 24, alignItems: "center", marginBottom: 32 },
  ctaTitle: { color: "#fff", fontSize: 20, fontWeight: "800", marginBottom: 8, textAlign: "center" },
  ctaDesc: { color: COLORS.textSecondary, fontSize: 13, textAlign: "center", marginBottom: 18, lineHeight: 20 },
  ctaBtn: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 12 },
  ctaBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
