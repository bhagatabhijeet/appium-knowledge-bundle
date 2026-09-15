---
type: Topic
title: Set up a real Android device on Windows
description: Enabling USB debugging on a real Android device, installing USB drivers if needed, and verifying the connection with Vysor screen mirroring.
tags: [appium, setup, windows, android, real-device, usb-debugging]
---

Automating a real Android device with Appium (rather than an emulator) has one hard prerequisite: **USB debugging** must be enabled on the device. Without it, Appium's `uiautomator2` driver can't talk to the device over `adb` at all. The exact menu steps below can vary slightly by manufacturer (OEM), but the underlying setting — USB debugging under Developer options — is the same across Android versions.

# Enable Developer options and USB debugging

1. On the device, open **Settings → About phone**, and tap **Build number** seven times. A toast confirms "You are now a developer."
2. Go back to **Settings**, where a new **Developer options** menu now appears (usually under System, or directly in the main Settings list depending on the OEM's skin).
3. Inside Developer options, enable **USB debugging**.
4. Connect the device to the Windows machine with a USB cable. On the device, a prompt appears asking to allow USB debugging from this computer — accept it (optionally checking "Always allow from this computer" to skip the prompt on future connections).

Menu wording and screenshots vary by device — Android's own [Configure on-device developer options](https://developer.android.com/studio/debug/dev-options) guide has the official step-by-step with screenshots if the above doesn't match what you see.

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
