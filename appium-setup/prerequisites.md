---
type: Topic
title: Appium setup prerequisites
description: What to have in place before installing Appium, and the environment issues that most often derail a first setup.
tags: [appium, setup, prerequisites]
---

Getting these prerequisites right before installing anything is worth the extra few minutes: skipping them is a common way to lose a week or more chasing setup problems that have nothing to do with Appium itself.

# Baseline technical requirements

The Appium server itself needs, per the [System Requirements](https://github.com/appium/appium/blob/master/packages/appium/docs/en/quickstart/requirements.md) documentation:

- A macOS, Linux, or Windows operating system.
- [Node.js](https://nodejs.org), in the version range Appium's current release supports (check the [Appium documentation](https://appium.github.io/appium/docs/en/2.0/) for the exact range) — an LTS release is recommended.
- [npm](https://npmjs.com) (bundled with Node.js, but upgradable independently).

Appium itself is lightweight; it has no significant disk or RAM requirements on its own. Each driver, though, typically needs the full developer toolchain and SDK for its target platform (see [Appium ecosystem and drivers](/driver-ecosystem/index.md)). Every official driver ships with the Appium Doctor tool, which checks whether its specific requirements are satisfied — run it before assuming a failed session is Appium's fault.

# Administrator access

Be an administrator on the Windows or Mac machine you're setting up. Without admin rights, you may not be able to install Appium or the software it depends on (Node.js, Android SDK tools, Xcode, and so on).

# Use a current OS version

Use a current, supported version of Windows or macOS. Older, unsupported OS versions are more likely to hit compatibility issues with current Node.js, Android SDK, or Xcode releases.

# Office machines: antivirus and company policy

A personal machine is the easiest place to practice Appium. On an office machine, two things commonly block a setup that would otherwise work fine:

- **Antivirus software** flagging or quarantining Appium or one of its dependencies.
- **Company policy** restricting downloads from the internet, or blocking software installation (including Node.js) outright.

If either applies, this isn't something to troubleshoot alone — work with the admin or security team responsible for those policies, and make sure your account has admin privileges on the machine itself.

# Emulators, simulators, and real devices

Android emulators (and iOS simulators) are resource-hungry: they need a reasonably powerful processor and sufficient RAM to run without becoming a source of constant, unrelated test flakiness. Don't try to run them on an old, underpowered laptop — the frustration is rarely worth it.

If you have access to a real Android or iOS device, prefer it: a real device sits outside the host machine, so it doesn't compete with it for processing power or RAM the way an emulator or simulator does.

# Device-specific restrictions

Some Android OEMs ship custom security restrictions on top of stock Android that can block Appium's automation commands outright, independent of anything in your Appium setup. For example, in a [Realme 3 Pro issue on the Appium GitHub](https://github.com/appium/appium/issues/13802), an Appium maintainer's diagnosis was direct: the device has vendor-added security limitations, and the practical options are to use a different device for automation or contact the vendor about relaxing those restrictions. That issue's comment thread is worth reading in full — several people worked around it by enabling specific developer-options settings (for example, disabling "permission monitoring"), though the fix isn't guaranteed to be the same on every device or OS version.

# When you hit an environment issue

Before assuming a problem is unique to you, search the [Appium GitHub issues page](https://github.com/appium/appium/issues) for it. You'll usually find either a solution, or confirmation that it's a known limitation you'll need to work around (as with the device-specific restrictions above).
