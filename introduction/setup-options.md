---
type: Topic
title: Ways to set up Appium
description: How the Appium host operating system limits which mobile platforms you can automate locally.
tags: [appium, setup, ios, android]
---

The machine running the Appium server (the host OS) determines which target platforms it can reach locally:

![Ways to set up Appium: host OS versus target platform](/assets/images/appium-setup-options.svg)

- **Appium on macOS**: Can automate both Android and iOS devices or simulators, since macOS is the only host that can run the Xcode tooling iOS automation depends on.
- **Appium on Windows (or Linux)**: Can automate Android devices, but not iOS — there is no supported way to run the XCUITest driver's iOS automation without macOS and Xcode. See [Limitations and considerations](limitations.md) for the underlying requirement.
- **Cloud-hosted Appium**: A cloud device provider (see [Advantages of Appium](advantages.md)) runs the Appium server on its own Mac infrastructure, so a team on Windows or Linux can still automate iOS devices without owning a Mac.

In short: local automation is Android-only unless the host machine is a Mac; the cloud path is the way most Windows- or Linux-based teams reach iOS.
