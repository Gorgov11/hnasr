import React, { useState } from "react";
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput,
  Linking, KeyboardAvoidingView, Platform, ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, BRAND } from "../constants/theme";

const API_BASE = "https://your-dgc-api.dgcc.ae"; // Replace with actual deployed URL

export default function ContactScreen() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", service: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      await fetch(`${API_BASE}/api/contact`, {
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
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={["#050a0f", "#080d14"]} style={styles.header}>
          <Text style={styles.accent}>GET IN TOUCH</Text>
          <Text style={styles.title}>Let's Build Something Great</Text>
          <Text style={styles.subtitle}>
            Ready to transform your business? Tell us about your project and we'll respond within 24 hours.
          </Text>
        </LinearGradient>

        {/* Contact cards */}
        <View style={styles.contactCards}>
          {[
            { emoji: "📧", label: "Email", value: BRAND.email, action: () => Linking.openURL(`mailto:${BRAND.email}`) },
            { emoji: "📞", label: "Phone", value: BRAND.phone, action: () => Linking.openURL(`tel:${BRAND.phone.replace(/\s/g, "")}`) },
            { emoji: "🌐", label: "Website", value: BRAND.website, action: () => Linking.openURL(`https://${BRAND.website}`) },
            { emoji: "📍", label: "Location", value: BRAND.location, action: undefined },
          ].map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={item.action}
              style={styles.contactCard}
              activeOpacity={item.action ? 0.7 : 1}
            >
              <Text style={styles.contactEmoji}>{item.emoji}</Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>{item.label}</Text>
                <Text style={[styles.contactValue, item.action && { color: COLORS.cyan }]}>{item.value}</Text>
              </View>
              {item.action && <Text style={styles.arrow}>›</Text>}
            </TouchableOpacity>
          ))}
        </View>

        {/* Why choose us */}
        <View style={styles.whySection}>
          <LinearGradient colors={["#00e5ff15", "#00e5ff05"]} style={styles.whyCard}>
            <Text style={styles.whyTitle}>Why Choose DGC?</Text>
            {[
              "Expert team with 8+ years of experience",
              "Full-service agency — one partner for everything",
              "AI-powered solutions for competitive advantage",
              "Delivered projects across 10+ countries",
              "On-time delivery with transparent communication",
            ].map((item) => (
              <View key={item} style={styles.whyItem}>
                <Text style={styles.whyCheck}>✓</Text>
                <Text style={styles.whyText}>{item}</Text>
              </View>
            ))}
          </LinearGradient>
        </View>

        {/* Contact form */}
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Send Us a Message</Text>

          {status === "sent" ? (
            <LinearGradient colors={["#10b98120", "#10b98110"]} style={styles.successBox}>
              <Text style={styles.successEmoji}>✅</Text>
              <Text style={styles.successTitle}>Message Sent!</Text>
              <Text style={styles.successText}>We'll be in touch within 24 hours.</Text>
              <TouchableOpacity onPress={() => setStatus("idle")} style={styles.sendAgainBtn}>
                <Text style={styles.sendAgainText}>Send Another Message</Text>
              </TouchableOpacity>
            </LinearGradient>
          ) : (
            <>
              <View style={styles.row}>
                <View style={styles.halfField}>
                  <Text style={styles.label}>Full Name *</Text>
                  <TextInput
                    value={form.name}
                    onChangeText={(v) => setForm({ ...form, name: v })}
                    placeholder="John Smith"
                    placeholderTextColor={COLORS.textMuted}
                    style={styles.input}
                  />
                </View>
                <View style={styles.halfField}>
                  <Text style={styles.label}>Email *</Text>
                  <TextInput
                    value={form.email}
                    onChangeText={(v) => setForm({ ...form, email: v })}
                    placeholder="john@company.com"
                    placeholderTextColor={COLORS.textMuted}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <Text style={styles.label}>Company Name</Text>
              <TextInput
                value={form.company}
                onChangeText={(v) => setForm({ ...form, company: v })}
                placeholder="Your Company Ltd."
                placeholderTextColor={COLORS.textMuted}
                style={[styles.input, styles.fullInput]}
              />

              <Text style={styles.label}>Service Interested In</Text>
              <TextInput
                value={form.service}
                onChangeText={(v) => setForm({ ...form, service: v })}
                placeholder="e.g. Mobile App, AI Solutions, E-commerce..."
                placeholderTextColor={COLORS.textMuted}
                style={[styles.input, styles.fullInput]}
              />

              <Text style={styles.label}>Message *</Text>
              <TextInput
                value={form.message}
                onChangeText={(v) => setForm({ ...form, message: v })}
                placeholder="Tell us about your project, goals, and timeline..."
                placeholderTextColor={COLORS.textMuted}
                style={[styles.input, styles.fullInput, styles.textarea]}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />

              {status === "error" && (
                <Text style={styles.errorText}>
                  Something went wrong. Please email us at {BRAND.email}
                </Text>
              )}

              <TouchableOpacity onPress={handleSubmit} disabled={status === "sending"} activeOpacity={0.8}>
                <LinearGradient
                  colors={status === "sending" ? ["#334155", "#334155"] : ["#00e5ff", "#0088cc"]}
                  style={styles.submitBtn}
                >
                  {status === "sending" ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.submitText}>Send Message →</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 24, paddingTop: 16 },
  accent: { color: COLORS.cyan, fontSize: 11, fontWeight: "700", letterSpacing: 3, marginBottom: 8 },
  title: { color: "#fff", fontSize: 26, fontWeight: "900", marginBottom: 10 },
  subtitle: { color: COLORS.textSecondary, fontSize: 14, lineHeight: 22 },
  contactCards: { padding: 16, gap: 10 },
  contactCard: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 14 },
  contactEmoji: { fontSize: 24 },
  contactInfo: { flex: 1 },
  contactLabel: { color: COLORS.textMuted, fontSize: 11, marginBottom: 2 },
  contactValue: { color: "#fff", fontSize: 14, fontWeight: "600" },
  arrow: { color: COLORS.cyan, fontSize: 22, fontWeight: "300" },
  whySection: { paddingHorizontal: 16, marginBottom: 8 },
  whyCard: { borderRadius: 16, padding: 20, borderWidth: 1, borderColor: "#00e5ff20" },
  whyTitle: { color: "#fff", fontWeight: "800", fontSize: 16, marginBottom: 14 },
  whyItem: { flexDirection: "row", gap: 10, marginBottom: 8, alignItems: "flex-start" },
  whyCheck: { color: COLORS.cyan, fontWeight: "800", fontSize: 14, marginTop: 1 },
  whyText: { color: COLORS.textSecondary, fontSize: 13, flex: 1, lineHeight: 19 },
  formSection: { padding: 16 },
  formTitle: { color: "#fff", fontSize: 20, fontWeight: "800", marginBottom: 16 },
  row: { flexDirection: "row", gap: 10 },
  halfField: { flex: 1 },
  label: { color: COLORS.textSecondary, fontSize: 12, fontWeight: "600", marginBottom: 6, marginTop: 4 },
  input: { backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, color: "#fff", fontSize: 13 },
  fullInput: { width: "100%", marginBottom: 4 },
  textarea: { height: 110, paddingTop: 12 },
  errorText: { color: "#ef4444", fontSize: 13, marginBottom: 12, textAlign: "center" },
  submitBtn: { borderRadius: 12, paddingVertical: 16, alignItems: "center", marginTop: 12 },
  submitText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  successBox: { borderRadius: 16, padding: 28, alignItems: "center", borderWidth: 1, borderColor: "#10b98130" },
  successEmoji: { fontSize: 40, marginBottom: 12 },
  successTitle: { color: "#fff", fontWeight: "800", fontSize: 20, marginBottom: 6 },
  successText: { color: COLORS.textSecondary, fontSize: 14, marginBottom: 16 },
  sendAgainBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: "#00e5ff40" },
  sendAgainText: { color: COLORS.cyan, fontWeight: "600", fontSize: 13 },
});
