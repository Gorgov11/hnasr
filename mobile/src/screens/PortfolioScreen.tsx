import React, { useState } from "react";
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/theme";

const { width } = Dimensions.get("window");

const PORTFOLIO = [
  {
    title: "Mystery of Hajj & Umrah",
    category: "Web Development",
    region: "KSA",
    desc: "A comprehensive digital platform providing an immersive experience about Hajj and Umrah, blending cultural sensitivity with cutting-edge web technology.",
    tags: ["Web Design", "CMS", "UI/UX"],
    color: ["#10b981", "#0d9488"] as [string, string],
  },
  {
    title: "Kabbani Furniture",
    category: "E-commerce + Mobile",
    region: "UAE / KSA",
    desc: "Full e-commerce ecosystem with website and iOS/Android apps generating thousands of orders and dramatically transforming the brand's digital presence.",
    tags: ["E-commerce", "iOS", "Android"],
    color: ["#7c3aed", "#4f46e5"] as [string, string],
  },
  {
    title: "TravAmerica",
    category: "Travel E-commerce",
    region: "USA",
    desc: "Feature-rich travel booking platform streamlining trip booking and significantly improving digital reach for this US-based travel agency.",
    tags: ["E-commerce", "Booking", "Travel"],
    color: ["#2563eb", "#1e40af"] as [string, string],
  },
  {
    title: "CDE Jewelry",
    category: "Mobile App",
    region: "International",
    desc: "Luxury mobile shopping experience for iOS and Android, reflecting brand elegance with seamless navigation and secure payment processing.",
    tags: ["iOS App", "Android App", "Luxury"],
    color: ["#d97706", "#b45309"] as [string, string],
  },
  {
    title: "MK Kabbani UAE",
    category: "Mobile App",
    region: "UAE",
    desc: "Sophisticated iOS and Android apps tailored for the UAE market, delivering smooth and intuitive furniture shopping experiences.",
    tags: ["iOS App", "Android App", "UAE"],
    color: ["#ec4899", "#db2777"] as [string, string],
  },
  {
    title: "The Perk Café",
    category: "Digital Marketing",
    region: "UAE",
    desc: "Global campaign introducing specialty drinks from 6 countries, resulting in significant customer engagement and positioning Perk as a coffee innovation leader.",
    tags: ["Social Media", "Campaign", "Branding"],
    color: ["#0ea5e9", "#0284c7"] as [string, string],
  },
  {
    title: "West Laundry",
    category: "Social Media",
    region: "UAE",
    desc: "Strategic social media management fostering strong community of loyal customers and enhancing brand visibility across digital platforms.",
    tags: ["Social Media", "Community", "Content"],
    color: ["#14b8a6", "#0d9488"] as [string, string],
  },
  {
    title: "Little Leaders Kids Salon",
    category: "Branding + Marketing",
    region: "UAE",
    desc: "Creative 3D characters embodying the 'Little Leaders' spirit, deployed across digital platforms creating memorable brand identity for children and parents.",
    tags: ["Branding", "3D Design", "Social"],
    color: ["#84cc16", "#65a30d"] as [string, string],
  },
  {
    title: "Joval Real Estate",
    category: "Branding",
    region: "Egypt",
    desc: "Elegant branding for Joval Real Estate Compound by Citadel Developments — logo and comprehensive brand strategy elevating market presence.",
    tags: ["Branding", "Logo", "Real Estate"],
    color: ["#f59e0b", "#d97706"] as [string, string],
  },
  {
    title: "Delight Pack",
    category: "Branding",
    region: "China",
    desc: "Luxury branding for this jewelry packaging manufacturer, encapsulating elegance, precision, and sophistication across all marketing materials.",
    tags: ["Branding", "Logo", "Luxury"],
    color: ["#8b5cf6", "#7c3aed"] as [string, string],
  },
  {
    title: "East Point Investments",
    category: "Branding",
    region: "Egypt",
    desc: "Complete branding solution for this leading real estate brokerage, embodying professionalism and leadership across all platforms.",
    tags: ["Branding", "Logo", "Real Estate"],
    color: ["#06b6d4", "#0891b2"] as [string, string],
  },
  {
    title: "London Juice UAE",
    category: "Digital Marketing",
    region: "UAE",
    desc: "Cost-effective organic strategy achieving substantial brand awareness growth despite modest budget — showcasing creativity in digital marketing.",
    tags: ["Marketing", "Organic", "Social"],
    color: ["#f97316", "#ea580c"] as [string, string],
  },
];

const FILTERS = ["All", "Web Development", "E-commerce + Mobile", "Mobile App", "Digital Marketing", "Branding", "Social Media", "Branding + Marketing"];

export default function PortfolioScreen() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={["#050a0f", "#080d14"]} style={styles.header}>
        <Text style={styles.accent}>OUR WORK</Text>
        <Text style={styles.title}>Portfolio of Success</Text>
        <Text style={styles.subtitle}>
          150+ projects delivered across 10+ countries — from mobile apps to full digital transformations.
        </Text>
      </LinearGradient>

      {/* Stats row */}
      <View style={styles.statsRow}>
        {[
          { v: "150+", l: "Projects" },
          { v: "10+", l: "Countries" },
          { v: "5+", l: "Industries" },
        ].map((s) => (
          <View key={s.l} style={styles.statChip}>
            <Text style={styles.statValue}>{s.v}</Text>
            <Text style={styles.statLabel}>{s.l}</Text>
          </View>
        ))}
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll} contentContainerStyle={styles.filtersContent}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filter, filter === f && styles.filterActive]}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Portfolio cards */}
      <View style={styles.cards}>
        {filtered.map((project) => (
          <View key={project.title} style={styles.card}>
            <LinearGradient colors={project.color} style={styles.cardGradient}>
              <Text style={styles.cardCategory}>{project.category}</Text>
              <Text style={styles.cardTitle}>{project.title}</Text>
              <View style={styles.regionBadge}>
                <Text style={styles.regionText}>{project.region}</Text>
              </View>
            </LinearGradient>
            <View style={styles.cardBody}>
              <Text style={styles.cardDesc}>{project.desc}</Text>
              <View style={styles.tagsRow}>
                {project.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 24, paddingTop: 16 },
  accent: { color: COLORS.cyan, fontSize: 11, fontWeight: "700", letterSpacing: 3, marginBottom: 8 },
  title: { color: "#fff", fontSize: 26, fontWeight: "900", marginBottom: 10 },
  subtitle: { color: COLORS.textSecondary, fontSize: 14, lineHeight: 22 },
  statsRow: { flexDirection: "row", gap: 10, marginHorizontal: 16, marginTop: 12, marginBottom: 4 },
  statChip: { flex: 1, backgroundColor: "rgba(0,229,255,0.08)", borderRadius: 12, padding: 12, alignItems: "center", borderWidth: 1, borderColor: "#00e5ff20" },
  statValue: { color: COLORS.cyan, fontSize: 20, fontWeight: "900" },
  statLabel: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },
  filtersScroll: { marginTop: 16 },
  filtersContent: { paddingHorizontal: 16, gap: 8 },
  filter: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  filterActive: { backgroundColor: COLORS.cyan, borderColor: COLORS.cyan },
  filterText: { color: COLORS.textSecondary, fontSize: 12, fontWeight: "600" },
  filterTextActive: { color: "#000" },
  cards: { padding: 16, gap: 16 },
  card: { borderRadius: 16, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  cardGradient: { padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  cardCategory: { color: "rgba(255,255,255,0.75)", fontSize: 11, marginBottom: 4 },
  cardTitle: { color: "#fff", fontSize: 17, fontWeight: "800", flex: 1, marginRight: 8 },
  regionBadge: { backgroundColor: "rgba(0,0,0,0.3)", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: "flex-start" },
  regionText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  cardBody: { padding: 16 },
  cardDesc: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 19, marginBottom: 12 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  tagText: { color: COLORS.textSecondary, fontSize: 11 },
});
