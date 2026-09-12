---
type: Topic
title: What is Appium?
description: What Appium is, its cross-platform model, and its language clients.
tags: [appium, overview]
---

Appium is an open-source automation framework for testing mobile applications and mobile web experiences. It can automate native, hybrid, and mobile web applications through standard WebDriver client libraries.

Appium is cross-platform. A test team can use the same WebDriver-based API across supported platforms, while the platform-specific driver and automation engine handle the details for the target device or emulator. Supported targets can include Android, iOS, and Windows automation scenarios, depending on the installed driver and environment.

![Appium cross-platform automation](/assets/images/appium-cross-platform.svg)

Appium supports multiple programming languages because its clients expose the WebDriver API in language-specific libraries. Common choices include Java, JavaScript, Python, C#, PHP, and Ruby. See [Supported languages](/introduction/supported-languages.md) for the full list of client libraries.

For a minimal Python session example, see [`assets/code/basic-session.py`](/assets/code/basic-session.py).
