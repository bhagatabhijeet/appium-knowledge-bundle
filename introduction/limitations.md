---
type: Topic
title: Limitations and considerations
description: Practical constraints and trade-offs to plan around when adopting Appium.
tags: [appium, limitations]
---

- **iOS environment requirements**: Local iOS automation requires macOS and the required Xcode tooling.
- **Infrastructure management**: A local Appium server lab is practical for a small setup, such as two or four devices connected to a single Mac or Windows machine. Scaling automation beyond that becomes a problem to manage locally; cloud device providers, where devices are managed separately and available on demand, reduce this infrastructure burden.
- **Documentation depth**: Some Appium documentation and driver documentation can be technical, so teams should validate examples against the installed Appium and driver versions.
- **Platform changes**: Changes in iOS, Xcode, Android, or a platform automation engine (such as XCTest) can potentially break Appium, though this is not frequent. Upgrade Appium, drivers, operating systems, and automation tooling together, and check the currently open issues on the [Appium GitHub issues page](https://github.com/appium/appium/issues) before and after upgrading.

# Next Topic

Next: [Drivers and platforms](/index.md)
