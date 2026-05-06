# DGC Mobile App — Digital Game Changers

React Native / Expo mobile application for DGC (Digital Game Changers) — a full-service digital agency.

## Screens

| Screen | Description |
|--------|-------------|
| **Home** | Hero, stats, service overview, AI highlight, portfolio preview, contact CTA |
| **Services** | Tabbed view of Software Dev, Digital Marketing, Creative services |
| **AI Solutions** | All AI services + live GPT-5 powered chat assistant |
| **Portfolio** | Filterable project showcase with 12+ real client projects |
| **Contact** | Contact form with API integration + direct call/email links |

## Setup

```bash
cd mobile
npm install
npx expo start
```

## Build for Production

```bash
# Android
npx eas build --platform android

# iOS
npx eas build --platform ios
```

## Configuration

Update `API_BASE` in `src/screens/AIServicesScreen.tsx` and `src/screens/ContactScreen.tsx` with your deployed backend URL.

## Tech Stack

- **Expo SDK 51** — Cross-platform framework
- **React Navigation** — Tab + stack navigation  
- **Expo Linear Gradient** — Beautiful gradient UI
- **React Native** 0.74 — Native UI components

## Brand Colors

| Color | Value |
|-------|-------|
| Background | `#050a0f` |
| Cyan Accent | `#00e5ff` |
| Violet | `#7b2eff` |
| Text Primary | `#f0f4f8` |
