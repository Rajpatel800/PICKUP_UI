# iOS Testing with EAS Build for React Native 0.87

This document outlines the findings regarding using EAS Build with your existing React Native 0.87 project for iOS testing on Windows, without downgrading the React Native version.

## Exact Compatibility Findings

1. **EAS Build capability:** EAS Build natively supports bare React Native projects (projects with `ios/` and `android/` folders). It does not require Expo Prebuild. It runs standard `pod install` and `xcodebuild` using Apple's infrastructure. It **can build the existing iOS native project as-is**.
2. **`expo-dev-client` mismatch:** React Native 0.87 introduced breaking changes (e.g., strict TypeScript API, toolchain changes). Expo SDK 57 expects React Native 0.86.x. Using `expo-dev-client` version 57 with RN 0.87 is unsupported and highly prone to native compilation errors during the iOS build phase.
3. **Development without `expo-dev-client`:** An iOS development build *can* be created without `expo-dev-client`. However, connecting it to a local Metro bundler running on a Windows machine is cumbersome and often requires network workarounds.
4. **UI Testing with JS Bundled:** An internal/release iOS build (or an iOS Simulator build) **can be used for UI testing**. In these modes, the JavaScript bundle is compiled directly into the app binary. This means you do not need a local Metro server or `expo-dev-client` running to test the app.
5. **Waiting for a future Expo SDK:** You do **not** need to wait for a future Expo SDK to build your app for iOS testing, provided you do not rely on `expo-dev-client` for the testing workflow.
6. **Existing Expo Configuration:** The existing Expo configuration (such as `package.json` entries for `expo`, `app.json`, and basic EAS settings) can safely remain. They will not affect Android. As long as `expo-dev-client` does not break the `pod install` or native compilation phase on iOS, it won't break the iOS build either.

## Supported Option: Simulator or Internal Distribution Build

The safest and most reliable way to test iOS from Windows without changing React Native versions is to create an EAS Build that bundles the JS code, completely bypassing the need for `expo-dev-client`.

*   **Simulator Build:** Create an iOS simulator build. EAS will provide a `.tar.gz` file that can be downloaded, extracted, and dragged onto a Mac's iOS Simulator. (Requires access to a Mac).
*   **Internal Distribution (Ad-Hoc/Enterprise):** Create an internal build. EAS will provision the build, and you can install it on a physical iOS device using a QR code or link. (Requires an active Apple Developer Account).

## Unsupported Option: Expo Development Build with RN 0.87

Attempting to compile an "Expo Development Build" (which specifically uses `expo-dev-client` to load updates from Metro) using Expo SDK 57 on a React Native 0.87 project. The native dependencies of `expo-dev-client` v57 are highly likely to fail compilation against the RN 0.87 headers on the EAS macOS workers.

## Risks

*   **`expo-dev-client` build failures:** Although we are leaving the configuration as-is, the mere presence of `expo-dev-client` in `package.json` might cause the EAS iOS build to fail during `pod install` or native compilation. If this occurs, it may need to be temporarily uninstalled or excluded from the iOS build process.
*   **Apple Developer Credentials:** To build for a physical iOS device (Internal Distribution), you **must** have an active Apple Developer Program membership. EAS will require access to handle provisioning profiles and certificates automatically.

## Recommended Path

1.  **Do not modify `package.json` or Android files.**
2.  **Initialize EAS Configuration:** Run the EAS configuration command to generate `eas.json` (since it currently does not exist in the project).
3.  **Configure `eas.json`:** Add an `internal` or `simulator` profile specifically for iOS testing that ensures the JS bundle is included.
4.  **Execute the Build:** Trigger the EAS build using the configured profile.
5.  **Test:** Install the resulting build on your iOS device or simulator.

## Commands (Only Run After Approval)

If you approve of this plan, I will run the following commands to initialize and configure EAS, and start the iOS build:

```bash
# 1. Initialize EAS (will prompt you to log in if not already)
npx eas-cli build:configure

# 2. (I will programmatically update eas.json to add a 'testing' profile)

# 3. Start the build for iOS (Choose ONE based on your testing target)

# For a physical device (requires Apple Developer account)
npx eas-cli build --platform ios --profile testing

# OR, for an iOS Simulator (does not strictly require paid Apple Dev account)
npx eas-cli build --platform ios --profile simulator
```
