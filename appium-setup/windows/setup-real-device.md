---
type: Topic
title: Set up a real Android device on Windows
description: Enabling USB debugging on a real Android device, installing USB drivers if needed, and verifying the connection with Vysor screen mirroring.
tags: [appium, setup, windows, android, real-device, usb-debugging]
---

Automating a real Android device with Appium (rather than an emulator) has one hard prerequisite: **USB debugging** must be enabled on the device. Without it, Appium's `uiautomator2` driver can't talk to the device over `adb` at all. The exact menu steps below can vary slightly by manufacturer (OEM), but the underlying setting — USB debugging under Developer options — is the same across Android versions.

# Enable Developer options and USB debugging

1. On the device, open **Settings → About phone**.

   ![Settings screen with About phone highlighted](/assets/images/enable-usb-debugging-step1-settings.png)

2. Tap **Build number** seven times. A toast confirms "You are now a developer."

   ![About phone screen with Build number entry](/assets/images/enable-usb-debugging-step2-build-number.png)

3. Go back to **Settings**, where a new **Developer options** menu now appears (usually under System, or directly in the main Settings list depending on the OEM's skin).

   ![Settings screen with Developer options now visible](/assets/images/enable-usb-debugging-step3-developer-options-entry.png)

4. Inside Developer options, enable **USB debugging**.

   ![Developer options screen with USB debugging toggled on](/assets/images/enable-usb-debugging-step4-toggle.png)

5. Connect the device to the Windows machine with a USB cable. On the device, a prompt appears asking to allow USB debugging from this computer — accept it (optionally checking "Always allow from this computer" to skip the prompt on future connections).

   ![Allow USB debugging confirmation dialog](/assets/images/enable-usb-debugging-step5-allow-dialog.png)

The screens above are generic mockups illustrating the flow, not a specific device's actual UI — exact menu wording and layout vary by manufacturer. Android's own [Configure on-device developer options](https://developer.android.com/studio/debug/dev-options) guide has the official steps with real device screenshots if what you see doesn't match.

# USB drivers

The first time you connect an Android device, Windows usually installs the necessary USB driver automatically, and in most cases that's all that's needed. If the device still isn't recognized (check **Device Manager** for an unrecognized or misbehaving entry), install the driver manually:

- **Google devices** (Pixel and other Google-branded hardware): [Google USB Driver](https://developer.android.com/studio/run/win-usb) from the official Android developer docs.
- **OEM devices** (Samsung, and other manufacturers running Android on their own hardware): [OEM USB Drivers](https://developer.android.com/studio/run/oem-usb), which links out to each manufacturer's own driver.

# Verify the connection with Vysor

[Vysor](https://www.vysor.io/) is a standalone app that mirrors an Android device's screen onto Windows or Mac. It isn't part of the Appium toolchain, but it shares Appium's exact prerequisite — USB debugging enabled — which makes it a convenient way to confirm the device/driver/cable setup works *before* troubleshooting anything Appium-specific.

1. Go to [vysor.io](https://www.vysor.io/) and select **Download** — the site detects your OS and offers the matching build; pick **Windows** explicitly if it doesn't.
2. Run the downloaded installer and complete setup with the defaults.
3. Launch Vysor with the device connected over USB. If USB debugging is enabled and the driver is working, Vysor detects the device automatically and offers to mirror it — no sign-in or extra configuration needed for basic mirroring.
4. If Vysor instead reports **"No Android devices connected,"** that confirms the problem is upstream of Appium — revisit USB debugging (above) and the driver install. Vysor's own screen links directly to both the USB-debugging steps and the ADB driver download if it doesn't detect a device.

Once Vysor mirrors the device successfully, it's ready for Appium: continue to [Appium Inspector](install-appium-inspector.md) and use the device's package/activity (instead of an emulator) as the session's capabilities.
