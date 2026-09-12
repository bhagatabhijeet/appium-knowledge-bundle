---
type: Topic
title: How Appium drivers work
description: What a driver actually is, how it maps the WebDriver protocol to a platform's native automation, and Appium's proxy mode.
tags: [appium, drivers, architecture]
---

A driver is Appium's answer to "how do we support automation of multiple, unrelated platforms?" [Ways to set up Appium](/introduction/setup-options.md) and the [platform-drivers section](/introduction/architecture.md) already cover UiAutomator2 and XCUITest concretely; this topic covers the general mechanism any driver uses, based on Appium's own [driver introduction](https://github.com/appium/appium/blob/master/packages/appium/docs/en/intro/drivers.md).

# A driver is just WebDriver-shaped code

At the most basic level, an Appium driver is a Node.js class that extends `BaseDriver`, a class Appium provides that already encapsulates the entire WebDriver protocol. A driver only needs to implement the methods that correspond to the WebDriver commands it wants to support — for example, a method named `setUrl` handles the WebDriver "Navigate To" command. Appium's protocol-to-method-name mapping lives in `@appium/base-driver`'s `routes.js`.

What a driver actually *does* inside that method is entirely up to its author, and depends on the target platform: a browser driver might set `window.location.href`, while a mobile driver might launch an app through a deep link. The WebDriver command name stays the same; the implementation underneath is platform-specific.

# Mapping WebDriver to native automation

The real challenge for a driver author is not the WebDriver protocol itself (`BaseDriver` handles that), but mapping it onto whatever native automation technology the target platform actually offers — technologies that usually have their own proprietary APIs. The UiAutomator2 driver, for example, relies not just on Android's UiAutomator2 framework, but also on ADB and on functions only available through a helper app (see [Platform drivers and native automation](/introduction/architecture.md)).

# Multi-level architecture

This mapping can require a fairly deep stack. The XCUITest framework Apple provides for iOS automation only runs in Objective-C or Swift, triggered through Xcode — there's no direct path from a Node.js method to an XCUITest API call. The XCUITest driver's authors solved this by splitting the driver into two halves: a Node.js half (the part Appium loads, which handles incoming WebDriver commands) and an Objective-C half that runs on the device and actually drives XCUITest. That Objective-C half is itself a WebDriver server, called [WebDriverAgent](https://github.com/appium/WebDriverAgent).

For an XCUITest session, the full chain of technologies in play looks like: your test code, the Appium client library, the network, the Appium server, the XCUITest driver, WebDriverAgent, Xcode, XCUITest, iOS, and macOS. It's a deep stack, and it's why debugging an iOS Appium test can mean tracing a failure through several independent layers.

# Proxy mode

Because both halves of a driver like XCUITest speak WebDriver, Appium can take a shortcut called proxying: instead of writing code to handle a command, a driver can tell Appium to forward that command's request directly to another WebDriver server (such as WebDriverAgent) and pass its response straight back to the client. The driver itself never touches the command. This is also how the [Safari driver](https://github.com/appium/appium-safari-driver) works — it implements almost nothing itself, proxying instead to an underlying SafariDriver process.

Proxying matters when debugging: if a driver's own source code has no implementation for a failing command, the command is likely being proxied elsewhere, and that's where the actual behavior needs to be traced.
