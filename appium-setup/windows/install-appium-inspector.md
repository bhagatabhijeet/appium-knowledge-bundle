---
type: Topic
title: Install Appium Inspector on Windows
description: Installing the Appium Inspector desktop app on Windows, and using it to verify the server and driver setup end-to-end.
tags: [appium, setup, windows, appium-inspector]
---

With the [Appium server installed](install-appium-server.md) and at least one driver in place, Appium Inspector is the next step: a standalone desktop app for inspecting an app's UI and building element locators, and the easiest way to confirm the whole setup — server, driver, and target app or emulator — actually works together.

# Download and install

Appium Inspector isn't installed via npm; it's a separate desktop app. Go to the [Appium Inspector releases page](https://github.com/appium/appium-inspector/releases) on GitHub and download the latest Windows installer (a `.exe` asset, typically named like `Appium-Inspector-Setup-*.exe`). Run the installer and accept the defaults.

# Start the Appium server

Appium Inspector connects to a running Appium server rather than starting one itself. In a Command Prompt window:

```sh
appium
```

Leave this running — it should print the server address (default `http://127.0.0.1:4723`) — and do the rest in Appium Inspector.

# Configure a session in Appium Inspector

1. Launch Appium Inspector.
2. Set the **Remote Host** to `127.0.0.1` and **Remote Port** to `4723` (the running server from the previous step), or paste the full **Remote Path** shown in the server's startup output.
3. Provide the desired capabilities for the session as JSON — at minimum the driver-specific `platformName` and `automationName` (e.g. `UiAutomator2` for Android), plus either `app` (a path to the app under test) or the app's package/activity for an app already installed on the target device or emulator.
4. Select **Start Session**.

# Verify the setup

If the session starts, Appium Inspector shows a live screenshot of the app with its UI hierarchy alongside it — selecting an element surfaces its locators (id, accessibility id, XPath, and so on). A successful session here confirms the server, the driver, and the target app or emulator are all correctly wired together; if it fails, the error Appium Inspector reports is usually more specific than a bare `appium driver doctor` check and points at exactly what's misconfigured (missing capability, device not connected, app path wrong, and so on).
