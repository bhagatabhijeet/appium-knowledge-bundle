---
type: Topic
title: Types of mobile apps
description: Native, hybrid, and mobile web apps, and how each affects automation with Appium.
tags: [appium, mobile-apps]
---

![Native, hybrid, and mobile web apps compared](/assets/images/appium-app-types-comparison.svg)

# Native apps

Native apps are built for a particular mobile operating system using its platform SDK and UI components, developed separately per platform — for example, Java or Kotlin for Android and Swift for iOS. They generally expose native elements to Appium and are automated through platform-specific drivers.

Examples include an Android app built with Kotlin and an iOS app built with Swift.

- **Development cycle**: Longer, since the Android and iOS versions are built and maintained as separate codebases.
- **Speed**: Fast, because the app uses the platform SDK's own native components directly — including things like the native keyboard, date pickers, permission dialogs, and other apps such as the camera.
- **User experience**: Rich, with fast screen transitions and full access to native UI components.
- **Automating with Appium**: Easiest to automate — UI elements are identified natively, no driver context switching is required, and elements are straightforward to inspect with the Appium Inspector.

# Hybrid apps

Hybrid apps combine native application screens with embedded web content, commonly displayed in a WebView — a native container that renders standard web content (HTML, JavaScript, and CSS) using the platform's browser engine. Because that WebView content is platform-agnostic, it can be built once and reused across platforms. Tests may need to switch between a native context and a web context during the same session.

- **Development cycle**: Shorter than a fully native app, depending on how much of the UI is WebView content, since that content is built once and reused across platforms.
- **Speed**: Comparatively slower, since the WebView content (HTML, CSS, JavaScript) has to load like a web page.
- **User experience**: Comparatively poorer, since WebView content is not optimized to interact with native components.
- **Automating with Appium**: Trickiest to automate — tests require driver context switching between the native and web contexts, and the Appium Inspector cannot inspect WebView elements directly (other mechanisms are covered in a later topic). On Android, the app must have debug mode enabled before its WebView elements can be inspected.

# Mobile web apps

Mobile web apps run in a mobile browser rather than being installed as an app. Appium automates browser interactions through WebDriver, including navigation, web elements, and browser contexts. There are two common designs:

- **Adaptive web apps**: built specifically for a mobile screen, deliberately exposing a reduced feature set compared to the full desktop site.
- **Responsive web apps**: load the same full feature set as the desktop site, with a layout that adjusts to fit the screen size.

- **Development cycle**: Shorter, since the same web application serves desktop and mobile with only responsive or adaptive design changes.
- **Speed**: Comparatively slower, since browser elements take time to load.
- **User experience**: Comparatively poorer, since the site is not optimized specifically for a mobile screen.
- **Automating with Appium**: Easy to automate — no driver context switching is required, so it is essentially the same as automating the desktop site, and the same element locators generally carry over. Elements are also easy to inspect using a desktop browser's own inspector.
