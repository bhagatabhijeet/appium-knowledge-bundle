---
type: Topic
title: Set up the Android SDK and JDK on Windows
description: Installing Android Studio, configuring the SDK, and setting ANDROID_HOME and PATH so Appium's uiautomator2 driver can find adb and friends.
tags: [appium, setup, windows, android, sdk, android-studio]
---

The `uiautomator2` driver — Appium's Android driver, [installed earlier](install-appium-server.md) — needs the Android SDK (for `adb` and the other tools it shells out to) and a JDK, neither of which ship with Appium itself. The Android SDK can technically be installed standalone, but Android Studio is the preferred route today, especially if you'll use the Android Emulator and Android Virtual Devices (AVDs) rather than only a real device — Android Studio bundles the SDK Manager and AVD Manager alongside it.

# System requirements

Before installing, make sure the machine can actually handle it:

- **Android Studio itself**: at least 8 GB RAM and 8 GB free disk space.
- **Each Android Virtual Device**: roughly 8-10 GB of disk space per AVD — more if you plan to keep several around.
- Underpowered or low-disk machines are a common source of "nothing works" frustration with the emulator specifically; a real device sidesteps this (see [Set up a real Android device](setup-real-device.md)) if the hardware is a constraint.
- **Virtualization**: running an AVD through the emulator needs hardware virtualization enabled — Intel VT-x or AMD-V, enabled in the BIOS/UEFI (settings and menu names vary by manufacturer; search for your specific board/laptop model). This is only needed for the emulator — a real device doesn't require it.

# Install Android Studio

1. Download the installer from [developer.android.com/studio](https://developer.android.com/studio) — it detects your OS automatically.
2. Accept the license terms and start the download.
3. Run the installer: **Next** → keep both components checked (Android Studio and Android Virtual Device) → **Next** → keep the default install location → **Next** → **Install**.
4. Once installation finishes, **Next** → check the box to start Android Studio → **Finish**.

# Install the SDK

On first launch, Android Studio reports **"No Android SDK found"** — this step installs it, so don't skip it:

1. **Next** through the SDK Setup Wizard, with all the default components selected.
2. Note the **SDK install location** shown on this screen (default is `C:\Users\<you>\AppData\Local\Android\Sdk`) — you'll need it shortly for `ANDROID_HOME`.
3. Confirm enough disk space is available, then **Next** → **Finish**. Expand **Show Details** to watch the component downloads if you want to confirm progress.

# Confirm SDK components in the SDK Manager

From Android Studio's welcome screen (or **More Actions → SDK Manager** once a project is open):

**SDK Platforms tab** — shows installed Android versions (e.g. Android 12 / API 31 shown as "Installed" by default). Checking a platform's checkbox expands its sub-components; confirm **Android SDK Platform** and **Sources for Android SDK** are installed for at least one version. The **system image** isn't needed yet — that's installed later when creating an AVD. Select and **Apply** any additional platform version you specifically need.

**SDK Tools tab** — confirm these are checked:
- **Android Emulator**
- **Android SDK Platform-Tools**
- **Android SDK Build-Tools**
- **Android SDK Command-line Tools (latest)** — not checked by default; check it. (Without it, `appium driver doctor` later flags `apkanalyzer.bat` as missing.)

Two more items appear here but aren't needed yet: **Intel x86 Emulator Accelerator (HAXM)** or the **Android Emulator Hypervisor Driver** (AMD) — these matter only when actually creating and running an AVD, covered separately. If you'll use a real Android device instead, you'll want the matching USB driver — see [Set up a real Android device](setup-real-device.md).

Click **Apply**, accept the license agreement, and let the components install, then **Finish** and close the SDK Manager.

# Set ANDROID_HOME and PATH

1. Open the Start menu, type **"edit the system environment variables"**, and open it (Control Panel's System Properties, Advanced tab).
2. Click **Environment Variables**.
3. Under **System variables**, click **New**. Set the variable name to `ANDROID_HOME` and the value to the SDK path noted earlier (also visible any time from the SDK Manager) — e.g. `C:\Users\<you>\AppData\Local\Android\Sdk`. Click **OK**.
4. Still under **System variables**, select **Path** and click **Edit**. Add two new entries:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\cmdline-tools\latest\bin`
5. Click **OK** on every open dialog to save.

# Confirm the SDK folders

Inside the SDK folder (`%ANDROID_HOME%`), these should all exist:

- `platform-tools\adb.exe` — **adb** (Android Debug Bridge), the tool Appium uses internally to talk to devices/emulators (install apps, launch apps, and more; also usable directly from the command line).
- `cmdline-tools\latest\bin\` — command-line tools, including `.bat` files Appium also uses internally.
- `emulator\emulator.exe` — used to launch AVDs, also used internally by Appium.

# Verify

Environment variable changes don't apply to already-open terminals — **close and reopen** Command Prompt before testing:

```bat
adb
echo %ANDROID_HOME%
echo %PATH%
```

`adb` should run (rather than "not recognized"), and both `echo` commands should resolve to the SDK path and include the `platform-tools`/`cmdline-tools\latest\bin` entries.

Then run Appium's own diagnostic for the driver:

```sh
appium driver doctor uiautomator2
```

Before `ANDROID_HOME` is set, this fails outright:

```
✖ ANDROID_HOME environment variable is NOT set!
✖ adb, emulator, apkanalyzer.bat could not be found because ANDROID_HOME is NOT set!
✔ JAVA_HOME is set to: C:\Program Files\Microsoft\jdk-25.0.4.101-hotspot\
...
Error: ✖ Treatment required
```

Once `ANDROID_HOME` and PATH are set correctly:

```
✔ ANDROID_HOME is set to: C:\Users\<you>\AppData\Local\Android\Sdk
  'adb' exists in C:\Users\<you>\AppData\Local\Android\Sdk\platform-tools\adb.exe
  'emulator' exists in C:\Users\<you>\AppData\Local\Android\Sdk\emulator\emulator.exe
✔ JAVA_HOME is set to: C:\Program Files\Microsoft\jdk-25.0.4.101-hotspot\
```

`apkanalyzer.bat`, `bundletool.jar`, and `gst-launch-1.0.exe`/`gst-inspect-1.0.exe` may still show as missing — these are optional (APK bundle inspection and device screen streaming respectively) and aren't required for typical Appium session automation. `apkanalyzer.bat` specifically comes from the **Android SDK Command-line Tools** package installed above, if you want to clear that one too.

# JDK

Appium also needs `JAVA_HOME` pointing at a JDK — Android Studio bundles its own under its install directory if you don't already have one. Set `JAVA_HOME` the same way as `ANDROID_HOME` above, e.g. `C:\Program Files\Microsoft\jdk-25.0.4.101-hotspot\`.

With the SDK and JDK in place, the next step is either [setting up a real Android device](setup-real-device.md) or creating an AVD, then running a session through [Appium Inspector](install-appium-inspector.md) to confirm everything end-to-end.
