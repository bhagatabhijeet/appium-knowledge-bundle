---
type: Topic
title: Install the Appium server (npm)
description: Installing the Appium 2.x server as a global npm package on Windows, verifying the version, and checking installed drivers.
tags: [appium, setup, windows, npm, appium-server]
---

With Node.js and npm in place (see [Install Node.js and npm on Windows](/appium-setup/windows/install-nodejs.md)), the Appium server itself is installed as a global npm package from Command Prompt.

# Install the server

```sh
npm install -g appium@next
```

The `@next` tag currently resolves to the Appium 2.x line. Once 2.x becomes npm's default `latest` tag, plain `npm install -g appium` will also pull it — but until then, use `@next` to be sure of getting Appium 2.x rather than the older 1.x server.

# Expected output

npm typically prints a block of `npm warn deprecated ...` lines while installing — these come from transitive dependencies (packages like `glob`, `rimraf`, `uuid`, `gauge`, or `npmlog` pulled in indirectly) and are advisory only. They don't block the install and can be ignored.

The install succeeded if npm finishes with a summary line such as `added N packages in Xs` and there are no `npm ERR!` lines.

# Verify the version after install

```sh
appium -v
```

This should print a version number (e.g. `2.0.1`), confirming the `appium` command is on the PATH and working.

# Find where the server was installed

`npm install -g` puts Appium in npm's global `node_modules` folder and drops a shim (`appium.cmd` for Command Prompt, `appium.ps1` for PowerShell) on the PATH so the bare `appium` command resolves to it. The commands to find both locations differ slightly by shell.

**Command Prompt (cmd.exe):**

```bat
npm root -g
where appium
```

```
C:\Users\<you>\AppData\Roaming\npm\node_modules
C:\Users\<you>\AppData\Roaming\npm\appium
C:\Users\<you>\AppData\Roaming\npm\appium.cmd
```

**PowerShell (Core / `pwsh`):**

```powershell
npm root -g
(Get-Command appium).Source
```

```
C:\Users\<you>\AppData\Roaming\npm\node_modules
C:\Users\<you>\AppData\Roaming\npm\appium.ps1
```

`npm root -g` is the same in both shells and points at the folder holding the actual package code (under `node_modules\appium`); `where` (cmd) and `Get-Command` (PowerShell) instead resolve which shim on the PATH actually runs when you type `appium`.

A quick visual check: open `node_modules\appium\lib` (under the `npm root -g` folder) in File Explorer. Seeing `main.js` there, alongside `appium.js`, `config.js`, and the rest of the server's source files, confirms the package installed correctly.

![File Explorer showing node_modules\appium\lib with main.js present](/assets/images/install-appium-server-lib-folder.png)

# Check installed drivers

Appium 2.x ships the server only — platform drivers such as `uiautomator2` (Android) or `xcuitest` (iOS) are not bundled and must be installed separately.

```sh
appium driver list --installed
```

Right after a fresh server install, this comes back empty — no drivers installed yet:

```
✔ Listing installed drivers
```

```sh
appium driver list
```

Without `--installed`, this lists every driver in Appium's official driver registry, marking each as installed or not — useful for picking one:

```
✔ Listing available drivers
- uiautomator2 [not installed]
- xcuitest [not installed]
- mac2 [not installed]
- espresso [not installed]
- safari [not installed]
- gecko [not installed]
- chromium [not installed]
```

Once a driver is installed (see next section), it shows up in the `--installed` output along with its version, and its `[not installed]` tag disappears from the full list.

# Next: install a driver

Installing a driver, e.g.:

```sh
appium driver install uiautomator2
```

is the next step, covered separately.

# Confirm the driver installed

Re-run the installed-drivers check from earlier:

```sh
appium driver list --installed
```

The driver should now appear with its installed version, e.g. `- uiautomator2@3.x.x [installed]`, confirming it's ready to use.

# Uninstall the server

Since Appium was installed as a global npm package, removing it is a plain npm uninstall:

```sh
npm uninstall -g appium
```

This removes the `node_modules\appium` package and its PATH shims (`appium.cmd` / `appium.ps1`) from the location found earlier. It does not remove installed drivers or their SDKs (e.g. Android SDK) — uninstall a driver first with `appium driver uninstall <name>` if it should go too. Confirm removal with:

```sh
appium -v
```

which should now fail with a "not recognized" error (cmd) or "not recognized as a name of a cmdlet" error (PowerShell).
