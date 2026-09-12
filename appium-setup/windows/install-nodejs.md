---
type: Topic
title: Install Node.js and npm on Windows
description: Installing Node.js and npm on Windows, the prerequisite for installing the Appium server itself.
tags: [appium, setup, windows, nodejs, npm]
---

Appium's server is installed and launched from the command line — on Windows, from Command Prompt. Before installing Appium itself, Node.js and npm need to be in place: Appium's server is a Node.js application, and npm (the Node Package Manager) is what installs Node.js-based software, Appium included. See [Appium setup prerequisites](/appium-setup/prerequisites.md) for the environment checks to do before this step.

# Check for an existing install

Open Command Prompt and run:

```sh
node -v
npm -v
```

If either command isn't recognized, Node.js — which bundles npm — isn't installed yet.

# Download Node.js

Go to [nodejs.org](https://nodejs.org) and download the **LTS** (Long Term Support) build for Windows, rather than the Current release — LTS is more stable. The Node.js installer bundles npm, so there's no separate npm install step.

# Run the installer

1. Launch the downloaded installer and select **Next**.
2. Accept the license terms and select **Next**.
3. Keep the default installation location and select **Next**. The installer confirms it will install both the Node.js runtime and the npm package manager.

With Node.js and npm installed, the next step is installing the Appium server itself with npm.
