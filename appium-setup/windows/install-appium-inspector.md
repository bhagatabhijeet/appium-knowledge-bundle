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

## Known warnings on first start

Two warnings are common on a fresh setup and don't block the server from starting:

```
(node:24692) [DEP0190] DeprecationWarning: Passing args to a child process with shell option true can lead to security vulnerabilities, as the arguments are not escaped, only concatenated.
WARN Appium Driver "uiautomator2" has 1 potential problem:
WARN Appium   - Driver "uiautomator2" (package `appium-uiautomator2-driver`) may be incompatible with the current version of Appium (v2.0.1) due to its peer dependency on older Appium v^3.0.0-rc.2. Please ask the developer of `appium-uiautomator2-driver` to update the peer dependency on Appium to v2.0.1
```

- The `DEP0190` notice is a Node.js runtime warning about how a dependency spawns a child process internally — it comes from Appium's own dependency tree, not from anything in your setup, and is safe to ignore.
- The `uiautomator2` peer-dependency warning means the driver version installed declares a peer dependency on a newer Appium line (`3.0.0-rc.2`) than the `2.0.1` server installed here. Appium still loads the driver despite the mismatch, and sessions typically still work. If sessions actually fail to start later (not just this warning), revisit the version pairing — either upgrade the Appium server or pin an older `uiautomator2` driver version compatible with `2.0.1`.

# Configure a session in Appium Inspector

1. Launch Appium Inspector.
2. Set the **Remote Host** to `127.0.0.1` and **Remote Port** to `4723` (the running server from the previous step), or paste the full **Remote Path** shown in the server's startup output.
3. Provide the desired capabilities for the session as JSON — at minimum the driver-specific `platformName` and `automationName` (e.g. `UiAutomator2` for Android), plus either `app` (a path to the app under test) or the app's package/activity for an app already installed on the target device or emulator.
4. Select **Start Session**.

# Verify the setup

If the session starts, Appium Inspector shows a live screenshot of the app with its UI hierarchy alongside it — selecting an element surfaces its locators (id, accessibility id, XPath, and so on). A successful session here confirms the server, the driver, and the target app or emulator are all correctly wired together; if it fails, the error Appium Inspector reports is usually more specific than a bare `appium driver doctor` check and points at exactly what's misconfigured (missing capability, device not connected, app path wrong, and so on).
