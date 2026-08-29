# Pickup App UI Repository

This repository contains the complete, production-ready React Native UI implementation for the Pickup App. It includes all 76 screens meticulously translated from the original Stitch designs into clean, heavily-typed, native React Native components.

## 🛠 Tech Stack & Environment

- **Framework**: React Native + Expo (SDK 54)
- **Language**: TypeScript (Strict Mode Enabled)
- **Navigation**: React Navigation (Native Stack)
- **Styling**: Native `StyleSheet` objects + Centralized Theme Tokens
- **Icons**: `@expo/vector-icons` (Feather & MaterialIcons)

> **Note to Developers:** This repository has been explicitly downgraded to **Expo SDK 54** to guarantee compatibility with older versions of Expo Go (specifically version `54.0.8`). All dependencies are locked to their SDK-54 compatible versions.

## 📁 Repository Structure

The architecture of the `src/` directory is logically grouped into specific domains:

```text
src/
├── components/           # Reusable Atomic UI Components (Buttons, Cards, Badges, etc.)
├── data/                 # Mock data used for visual testing and gallery representation
├── navigation/           # React Navigation configurations (RootNavigator.tsx)
├── screens/              # All 76 UI Screens logically grouped:
│   ├── auth/             # Login, OTP Verification, Permissions
│   ├── booking/          # Location selection, Vehicle selection, Fare estimates
│   ├── home/             # Main application dashboard
│   ├── logistics/        # Pickups, Drop-offs, Multi-drop flows, Goods details
│   ├── payment/          # Payment methods, processing screens, receipts
│   ├── profile/          # User settings, saved addresses, trip history
│   ├── support/          # Error states, empty states, chat, cancellations
│   └── tracking/         # Live map tracking, driver assignment states
├── theme.ts              # Global design tokens (Colors, Typography, Spacing, Shadows)
└── utils/                # Helper functions (e.g., responsive scaling)
```

## 🚀 Getting Started

### 1. Installation
Install the exact dependency versions:
```bash
npm install
```

### 2. Running the App
To start the Expo bundler (using the local cache):
```bash
npm run start -- --lan -c
```

> **Gallery Mode Enabled**: The current `App.tsx` is configured as a **Visual Gallery View**, allowing you to click through and view all 76 screens in an isolated environment. When you are ready to implement the real application logic, simply replace the `App.tsx` entry point to load the actual authentication/home stack instead of the gallery list.

## 🎨 Design System & Best Practices

To maintain the high-quality UI across future updates, please adhere to these guidelines:

- **Theme Tokens**: Do NOT hardcode colors or spacing. Always import from `src/theme.ts` (e.g., `colors.primary`, `spacing.md`).
- **Positioning**: Floating elements (like back buttons or bottom bars) use absolute positioning via explicit coordinates (`top: 0`, `bottom: 0`, etc.) to align perfectly with the original designs.
- **Strict Typing**: The `tsconfig.json` has `strict: true` enabled. All screen props (especially variants for empty states or errors) are strictly typed.

## 📱 State of the Repo
- **100% Native**: There are zero WebViews or HTML elements. Everything is built with highly performant native tags (`<View>`, `<Text>`, `<Pressable>`).
- **TypeScript Checked**: The repository currently passes `npx tsc --noEmit` with **0 errors**.

Happy building! 🚀
