---
type: Reference
title: Appium driver catalog
description: Officially-maintained and community-maintained Appium drivers, their target platforms, and install commands.
tags: [appium, drivers, reference]
---

Every driver is installed with `appium driver install <name>` (or `--source=npm <package>` for a driver not in Appium's official driver list). Full, current listing: [Appium Drivers](https://github.com/appium/appium/blob/master/packages/appium/docs/en/ecosystem/drivers.md) in the appium/appium repo.

# Official drivers

Maintained by the Appium team:

| Driver | Target | Mode(s) | Install |
| --- | --- | --- | --- |
| [Chromium](https://github.com/appium/appium-chromium-driver) | Desktop and mobile Chromium browsers (Chrome, Edge) | Web | `appium driver install chromium` |
| [Espresso](https://github.com/appium/appium-espresso-driver) | Android applications | Native | `appium driver install espresso` |
| [Gecko](https://github.com/appium/appium-geckodriver) | Desktop and mobile Gecko browsers (Firefox) | Web | `appium driver install gecko` |
| [Mac2](https://github.com/appium/appium-mac2-driver) | macOS applications | Native | `appium driver install mac2` |
| [Safari](https://github.com/appium/appium-safari-driver) | Desktop and mobile Safari | Web | `appium driver install safari` |
| [UiAutomator2](https://github.com/appium/appium-uiautomator2-driver) | Android, Android TV, Android Wear | Native, Hybrid, Web | `appium driver install uiautomator2` |
| [Windows](https://github.com/appium/appium-windows-driver) | Windows applications | Native | `appium driver install windows` |
| [XCUITest](https://appium.github.io/appium-xcuitest-driver/) | iOS, iPadOS, tvOS | Native, Hybrid, Web | `appium driver install xcuitest` |

The Windows driver's Node.js part is Appium-maintained, but its server part (Microsoft's WinAppDriver executable) has not been updated since 2022.

# Other (community-maintained) drivers

Not maintained by the Appium team, but usable for platforms Appium's official drivers don't reach:

| Driver | Target | Mode | Maintained by |
| --- | --- | --- | --- |
| [Flutter](https://github.com/appium/appium-flutter-driver) | iOS/Android apps built with Flutter | Native | Appium team / community |
| [Flutter Integration](https://github.com/AppiumTestDistribution/appium-flutter-integration-driver) | iOS/Android apps built with Flutter | Native | Community (`@AppiumTestDistribution`) |
| [LG WebOS](https://github.com/headspinio/appium-lg-webos-driver) | LG TV web applications | Web | HeadSpin |
| [Linux (`@Itsmeaj`)](https://github.com/Itsmeaj/appium) | Linux desktop applications (X11, Wayland) | Native | Community (`@Itsmeaj`) |
| [NovaWindows](https://github.com/AutomateThePlanet/appium-novawindows-driver) | Windows applications; a drop-in replacement for the official Windows driver | Native | Community / Automate The Planet |
| [Roku](https://github.com/headspinio/appium-roku-driver) | Roku channels | Native | HeadSpin |
| [TizenTV](https://github.com/headspinio/appium-tizen-tv-driver) | Tizen TV web applications | Web | HeadSpin |

A few other community drivers exist for Linux, Tizen, and You.i Engine, but per the upstream catalog have not been maintained since 2020–2022 and target Appium 1 or require a custom install; check the [full catalog](https://github.com/appium/appium/blob/master/packages/appium/docs/en/ecosystem/drivers.md) before relying on one of these.
