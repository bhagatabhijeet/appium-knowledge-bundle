---
type: Topic
title: "UiAutomator2 vs. Espresso"
description: How Android's UiAutomator and Espresso frameworks compare, and what that means for choosing between Appium's UiAutomator2 and Espresso drivers.
tags: [appium, android, uiautomator2, espresso, drivers]
---

Appium's two official Android drivers each wrap a different Google testing framework: the [UiAutomator2 driver](https://github.com/appium/appium-uiautomator2-driver) wraps [UiAutomator](https://developer.android.com/training/testing/ui-automator), and the [Espresso driver](https://github.com/appium/appium-espresso-driver) wraps [Espresso](https://developer.android.com/training/testing/espresso). The two underlying frameworks take different approaches, which carries through to the driver built on top of each:

| Aspect | UiAutomator2 | Espresso |
| --- | --- | --- |
| Underlying framework | [UiAutomator](https://developer.android.com/training/testing/ui-automator) | [Espresso](https://developer.android.com/training/testing/espresso) |
| Speed | Slow | Fast |
| Synchronization | Tests need to be synchronized manually | Supports auto synchronization |
| Access to the app | Black box | Has access to the internals of the app |
| Off-screen elements | Cannot find elements not rendered on the screen | Can find elements not rendered on the screen |
| Android View Tag | Cannot be used to find a UI element | Can be used to find a UI element |
| App knowledge required | Understanding of the app's implementation details is not needed | Understanding of the codebase is needed |
| Best suited for | Automating UI functional tests | Automating unit tests |
| Scope | Can test multiple apps and interact with the system | Can test only one app |
| Jetpack Compose | No official support yet | Supported |
| Learning curve | Easy to start with | Can be long |

Because UiAutomator2 treats the app as a black box with no code-level access, it fits Appium's usual role: black-box, cross-app functional testing where the tester doesn't need (or have) access to the app's source. Espresso's speed and internal access make it better suited to fast, in-process unit-style testing of a single app whose codebase the tester already understands — closer to what [Appium compared with platform-specific tools](/introduction/tool-comparison.md) already says about Espresso being the faster, close-to-application choice.
