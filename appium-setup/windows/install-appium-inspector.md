---
type: Topic
title: Install Appium Inspector on Windows
description: Installing the Appium Inspector desktop app on Windows, and using it to verify the server and driver setup end-to-end.
tags: [appium, setup, windows, appium-inspector]
---

With the [Appium server installed](install-appium-server.md) and at least one driver in place, Appium Inspector is the next step: a standalone desktop app for inspecting an app's UI and building element locators, and the easiest way to confirm the whole setup — server, driver, and target app or emulator — actually works together.

# Download and install

Appium Inspector isn't installed via npm; it's a separate desktop app. Go to the [Appium Inspector releases page](https://github.com/appium/appium-inspector/releases) on GitHub and download the latest Windows installer (a `.exe` asset, typically named like `Appium-Inspector-*-win-x64.exe`). Run the installer and step through the wizard:

1. **Choose Installation Options** — install for all users, or just the current user (the simpler choice on a personal machine, no admin prompt needed).

   ![Appium Inspector installer: Choose Installation Options screen](/assets/images/install-appium-inspector-wizard-screen1.png)

2. **Choose Install Location** — the default per-user path under `AppData\Local\Programs\Appium Inspector` is fine; change it only if you have a reason to.

   ![Appium Inspector installer: Choose Install Location screen](/assets/images/install-appium-inspector-wizard-screen2.png)

3. Select **Install**, then **Finish** once setup completes.

   ![Appium Inspector installer: Completing Appium Inspector Setup screen](/assets/images/install-appium-inspector-wizard-screen3.png)

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

- The `DEP0190` notice is a Node.js runtime warning about how a dependency spawns a child process internally — it comes from Appium's own dependency tree, not from anything in your setup, is purely cosmetic, and isn't fixed by any version change.
- The `uiautomator2` peer-dependency warning is fixable. It appears because `appium driver install uiautomator2` pulls the newest driver release, which targets Appium's upcoming 3.x prerelease line rather than 2.x. Two changes clear it:

  ```sh
  appium driver uninstall uiautomator2
  appium driver install uiautomator2@4.2.9
  npm install -g appium@2.19.0
  ```

  `4.2.9` is the newest `uiautomator2` driver release whose peer dependency (`^2.4.1 || ^3.0.0-beta.0`) still accepts an Appium 2.x server; `2.19.0` is the latest Appium 2.x release, satisfying that `≥2.4.1` floor (a plain `npm install -g appium@next` earlier in this bundle's setup steps lands on an older 2.x snapshot that doesn't). Check the current latest versions of each with `npm view appium-uiautomator2-driver versions` / `npm view appium versions` before reusing these exact numbers, since both move over time.

# Configure a session in Appium Inspector

1. Launch Appium Inspector.
2. Set the **Remote Host** to `127.0.0.1` and **Remote Port** to `4723` (the running server from the previous step), or paste the full **Remote Path** shown in the server's startup output.
3. Provide the desired capabilities for the session as JSON — at minimum the driver-specific `platformName` and `automationName` (e.g. `UiAutomator2` for Android), plus either `app` (a path to the app under test) or the app's package/activity for an app already installed on the target device or emulator.
4. Select **Start Session**.

# Verify the setup

If the session starts, Appium Inspector shows a live screenshot of the app with its UI hierarchy alongside it — selecting an element surfaces its locators (id, accessibility id, XPath, and so on). A successful session here confirms the server, the driver, and the target app or emulator are all correctly wired together; if it fails, the error Appium Inspector reports is usually more specific than a bare `appium driver doctor` check and points at exactly what's misconfigured (missing capability, device not connected, app path wrong, and so on).
